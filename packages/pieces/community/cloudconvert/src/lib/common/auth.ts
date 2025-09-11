import { PieceAuth } from "@activepieces/pieces-framework";
import { makeRequest } from "./client";
import { HttpMethod } from "@activepieces/pieces-common";

export const CloudConvertAuth = PieceAuth.SecretText({
    displayName: 'CloudConvert API Key',
    description: `**Enter your CloudConvert API Key.**
---
### How to obtain your API key
1. Visit [cloudconvert.com](https://cloudconvert.com) and log in.
2. Go to your **Dashboard** → **API Keys**.
3. Click **Create API Key**.
4. Copy the API key and paste it here.
`,
    required: true,
    validate: async ({ auth }) => {
        if (auth) {
            try {
                await makeRequest(auth as string, HttpMethod.GET, '/users/me');
                return { valid: true };
            } catch (error) {
                return { valid: false, error: 'Invalid API Key' };
            }
        }
        return { valid: false, error: 'Invalid API Key' };
    },
});
