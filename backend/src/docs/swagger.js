import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'AutoService API',
      version: '1.0.0',
      description: 'API do sistema AutoService para gerenciamento de oficinas automotivas.',
    },

    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor Local',
      },
    ],

    tags: [
      {
        name: 'Clientes',
        description: 'Gerenciamento de clientes',
      },
    ],

    components: {
      schemas: {
        Cliente: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            nome: {
              type: 'string',
              example: 'Paulo Roberto',
            },
            tipoPessoa: {
              type: 'string',
              enum: ['FISICA', 'JURIDICA'],
              example: 'FISICA',
            },
            cpfCnpj: {
              type: 'string',
              example: '12345678901',
            },
            celular: {
              type: 'string',
              example: '98999999999',
            },
            telefone: {
              type: 'string',
              example: '9833333333',
            },
            email: {
              type: 'string',
              example: 'paulo@email.com',
            },
            ativo: {
              type: 'boolean',
              example: true,
            },
          },
        },
      },
    },
  },

  apis: ['./src/modules/**/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
