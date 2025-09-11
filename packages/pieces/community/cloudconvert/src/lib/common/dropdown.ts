import { Property } from '@activepieces/pieces-framework';
import { makeRequest } from './client';
import { HttpMethod } from '@activepieces/pieces-common';

// Define the shape of props we expect
type ConvertProps = {
  inputFormat?: string;
};

export const inputFormatDropdown = Property.Dropdown<string>({
  displayName: 'Input Format',
  description: 'Select the format of the input file',
  required: true,
  refreshers: [],
  async options({ auth }) {
    if (!auth) {
      return {
        disabled: true,
        options: [],
        placeholder: 'Please connect your CloudConvert account first',
      };
    }

    try {
      const response = await makeRequest(auth as string, HttpMethod.GET, '/convert/formats');

      const formats = response.data as Array<{
        input_format: string;
        output_format: string;
        type: string;
      }>;

      const inputFormats = Array.from(
        new Set(formats.filter(f => f.type === 'file').map(f => f.input_format))
      ).map(fmt => ({
        label: fmt.toUpperCase(),
        value: fmt,
      }));

      return {
        disabled: false,
        options: inputFormats,
      };
    } catch (err: any) {
      return {
        disabled: true,
        options: [],
        placeholder: `Failed to load formats: ${err.message}`,
      };
    }
  },
});

export const outputFormatDropdown = Property.Dropdown<string>({
  displayName: 'Output Format',
  description: 'Select the desired output format',
  required: true,
  refreshers: ['inputFormat'],
  async options({ auth, propsValue }) {
    if (!auth) {
      return {
        disabled: true,
        options: [],
        placeholder: 'Please connect your CloudConvert account first',
      };
    }

    const { inputFormat } = propsValue as ConvertProps;

    if (!inputFormat) {
      return {
        disabled: true,
        options: [],
        placeholder: 'Select an input format first',
      };
    }

    try {
      const response = await makeRequest(auth as string, HttpMethod.GET, '/convert/formats');

      const formats = response.data as Array<{
        input_format: string;
        output_format: string;
        type: string;
      }>;

      const outputFormats = formats
        .filter(f => f.type === 'file' && f.input_format === inputFormat)
        .map(f => ({
          label: f.output_format.toUpperCase(),
          value: f.output_format,
        }));

      return {
        disabled: false,
        options: outputFormats,
      };
    } catch (err: any) {
      return {
        disabled: true,
        options: [],
        placeholder: `Failed to load formats: ${err.message}`,
      };
    }
  },
});
