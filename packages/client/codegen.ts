import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000',
  documents: ['src/**/*.graphql'],
  generates: {
    'src/api/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-rtk-query',
      ],
      config: {
        importBaseApiFrom: './baseApi',
        importBaseApiValueName: 'baseApi', 
        exportHooks: true,
        documentMode: 'string',            
        enumsAsTypes: true,                
        useTypeImports: true,
      },
    },
  },
};

export default config;