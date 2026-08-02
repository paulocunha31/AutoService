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
      {
        name: 'Veículos',
        description: 'Gerenciamento de veículos',
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
        Veiculo: {
          type: 'object',
          required: ['placa', 'marca', 'modelo', 'ano', 'clienteId'],
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },

            placa: {
              type: 'string',
              example: 'ABC1D23',
            },

            marca: {
              type: 'string',
              example: 'Toyota',
            },

            modelo: {
              type: 'string',
              example: 'Corolla',
            },

            ano: {
              type: 'integer',
              example: 2022,
            },

            cor: {
              type: 'string',
              nullable: true,
              example: 'Prata',
            },

            combustivel: {
              type: 'string',
              nullable: true,
              example: 'Flex',
            },

            quilometragem: {
              type: 'integer',
              nullable: true,
              example: 45000,
            },

            clienteId: {
              type: 'integer',
              example: 1,
            },

            ativo: {
              type: 'boolean',
              example: true,
            },

            createdAt: {
              type: 'string',
              format: 'date-time',
            },

            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Categoria: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            nome: {
              type: 'string',
              example: 'Ar-condicionado',
            },
            descricao: {
              type: 'string',
              example: 'Serviços de ar-condicionado automotivo',
            },
            ativo: {
              type: 'boolean',
              example: true,
            },
          },
        },
        Servico: {
          type: 'object',
          required: ['nome', 'preco', 'categoriaId'],
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            nome: {
              type: 'string',
              example: 'Recarga de gás',
            },
            descricao: {
              type: 'string',
              example: 'Recarga do sistema de ar-condicionado automotivo',
            },
            preco: {
              type: 'number',
              format: 'double',
              example: 150.0,
            },
            categoriaId: {
              type: 'integer',
              example: 1,
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
