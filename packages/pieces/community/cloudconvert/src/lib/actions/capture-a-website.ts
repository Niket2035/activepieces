import { createAction, Property } from '@activepieces/pieces-framework';
import { CloudConvertAuth } from '../common/auth';

export const captureAWebsite = createAction({
  auth: CloudConvertAuth,
  name: 'captureAWebsite',
  displayName: 'Capture a Website',
  description: '',
  props: {
    url: Property.ShortText({
      displayName: 'Website URL',
      description: 'The URL of the website to capture (e.g., https://example.com).',
      required: true,
    }),
    outputFormat: Property.StaticDropdown({
      displayName: 'Output Format',
      description: 'Select the format for the capture.',
      required: true,
      options: {
        disabled: false,
        options: [
          { label: 'PDF', value: 'pdf' },
          { label: 'PNG', value: 'png' },
          { label: 'JPG', value: 'jpg' },
        ],
      },
    }),
    pages: Property.ShortText({
      displayName: 'Pages',
      description: 'Specify page ranges to capture (e.g., "1-2" for pages 1 to 2). Leave empty to capture the entire page.',
      required: false,
    }),
    filename: Property.ShortText({
      displayName: 'Filename',
      description: 'Optional: Specify output filename including extension.',
      required: false,
    }),
    engine: Property.ShortText({
      displayName: 'Engine',
      description: 'Optional: e.g., "chrome" engine for rendering.',
      required: false,
    }),
    engineVersion: Property.ShortText({
      displayName: 'Engine Version',
      description: 'Optional specific engine version for rendering.',
      required: false,
    }),
    timeout: Property.Number({
      displayName: 'Timeout (seconds)',
      description: 'Optional timeout for the capture task (default is 5 hours).',
      required: false,
    }),
    pagewidth: Property.Number({
      displayName: 'Page Width',
      description: 'Optional width of the page in pixels (default is 1920).',
      required: false,
    }),
    pageheight: Property.Number({
      displayName: 'Page Height',
      description: 'Optional height of the page in pixels (default is 1080).',
      required: false,
    }),
    fullpage: Property.Checkbox({
      displayName: 'Full Page',
      description: 'Capture the full scrollable page (true/false). Default is false.',
      required: false,
      defaultValue: false,
    }),
  },
  async run() {
    // Action logic here
  },
});
