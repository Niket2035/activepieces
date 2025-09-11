import { createAction, Property } from '@activepieces/pieces-framework';
import { CloudConvertAuth } from '../common/auth';
import { makeRequest } from '../common/client';
import { HttpMethod } from '@activepieces/pieces-common';
import { inputFormatDropdown } from '../common/dropdown';
import { outputFormatDropdown } from '../common/dropdown';
import FormData from 'form-data';

export const convertAFile = createAction({
  auth: CloudConvertAuth,
  name: 'convertAFile',
  displayName: 'Convert a File',
  description: 'Create a file conversion task in CloudConvert with advanced options.',
  props: {
    fileUrl: Property.ShortText({
      displayName: 'File URL',
      description: 'The URL of the file to be converted. If provided, the file will be imported via URL.',
      required: false,
    }),
    file: Property.File({
      displayName: 'File',
      description: 'The file to be uploaded and converted. Used if no File URL is provided.',
      required: false,
    }),

    inputFormat: inputFormatDropdown,
    outputFormat: outputFormatDropdown,

    filename: Property.ShortText({
      displayName: 'Output Filename',
      description: 'Optional filename for the converted file, e.g., myfile.pdf',
      required: false,
    }),

    engine: Property.ShortText({
      displayName: 'Engine',
      description: 'Optional: Use a specific conversion engine.',
      required: false,
    }),

    engineVersion: Property.ShortText({
      displayName: 'Engine Version',
      description: 'Optional: Use a specific engine version.',
      required: false,
    }),

    timeout: Property.Number({
      displayName: 'Timeout (seconds)',
      description: 'Timeout in seconds after which the task will be cancelled. Default = 5 hours.',
      required: false,
    }),

    pages: Property.ShortText({
      displayName: 'Pages',
      description: 'Page range for conversion, e.g., "1-2".',
      required: false,
    }),

    optimizePrint: Property.Checkbox({
      displayName: 'Optimize for Print',
      description: 'Optimize output for printing (true/false).',
      required: false,
      defaultValue: false,
    }),
  },
  async run({ auth, propsValue }) {
   
    let importTask;
    if (propsValue.fileUrl) {
      importTask = await makeRequest(auth, HttpMethod.POST, '/import/url', {
        url: propsValue.fileUrl,
      });
    } else if (propsValue.file) {
   
      const uploadTask = await makeRequest(auth, HttpMethod.POST, '/import/upload', {});
      const { url, parameters } = uploadTask.data.result.form;

      const buffer = propsValue.file.data;

      const form = new FormData();
      Object.entries(parameters).forEach(([key, value]) => {
        form.append(key, value as string);
      });
      form.append('file', buffer, propsValue.file.filename);

      await fetch(url, {
        method: 'POST',
        body: form as any,
      });

      importTask = uploadTask;
    } else {
      throw new Error('You must provide either File URL or File.');
    }

    const inputTaskId = importTask.data.id;

    // 2. Convert Task
    const convertPayload: Record<string, any> = {
      input: inputTaskId,
      input_format: propsValue.inputFormat,
      output_format: propsValue.outputFormat,
    };

    if (propsValue.filename) convertPayload['filename'] = propsValue.filename;
    if (propsValue.engine) convertPayload['engine'] = propsValue.engine;
    if (propsValue.engineVersion) convertPayload['engine_version'] = propsValue.engineVersion;
    if (propsValue.timeout) convertPayload['timeout'] = propsValue.timeout;
    if (propsValue.pages) convertPayload['pages'] = propsValue.pages;
    if (propsValue.optimizePrint) convertPayload['optimize_print'] = propsValue.optimizePrint;

    const convertTask = await makeRequest(auth, HttpMethod.POST, '/convert', convertPayload);

    return convertTask;
  },
});
