import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-axios',
  input: './src/openapi/2024-10-18.openapi.yaml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/openapi',
  },
});
