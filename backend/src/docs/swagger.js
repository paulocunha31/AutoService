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
        name: 'Auth',
        description: 'Autenticação de usuários',
      },
      {
        name: 'Clientes',
        description: 'Gerenciamento de clientes',
      },
      {
        name: 'Veículos',
        description: 'Gerenciamento de veículos',
      },

      {
        name: 'Categorias',
        description: 'Gerenciamento de categorias',
      },
      {
        name: 'Serviços',
        description: 'Gerenciamento de serviços',
      },
      {
        name: 'Produtos',
        description: 'Gerenciamento de produtos',
      },
      {
        name: 'Agendamentos',
        description: 'Gerenciamento de agendamentos',
      },
      {
        name: 'Usuarios',
        description: 'Gerenciamento de Usuários',
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Login: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'roberto@email.com',
            },
            senha: {
              type: 'string',
              format: 'password',
              example: '654321',
            },
          },
        },
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
        Produto: {
          type: 'object',
          required: ['nome', 'preco', 'categoriaId'],
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },

            nome: {
              type: 'string',
              example: 'Filtro de cabine',
            },

            descricao: {
              type: 'string',
              example: 'Filtro de cabine para ar-condicionado automotivo',
            },

            preco: {
              type: 'number',
              format: 'float',
              example: 89.9,
            },

            estoque: {
              type: 'integer',
              example: 10,
            },

            fotoUrl: {
              type: 'string',
              format: 'uri',
              example: 'https://exemplo.com/imagens/filtro-cabine.jpg',
            },

            ativo: {
              type: 'boolean',
              example: true,
            },

            categoriaId: {
              type: 'integer',
              example: 1,
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
        Agendamento: {
          type: 'object',
          required: ['clienteId', 'veiculoId', 'servicoId', 'data'],
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },

            clienteId: {
              type: 'integer',
              example: 1,
            },

            veiculoId: {
              type: 'integer',
              example: 1,
            },

            servicoId: {
              type: 'integer',
              example: 1,
            },

            data: {
              type: 'string',
              format: 'date-time',
              example: '2026-09-15T14:00:00',
            },

            observacoes: {
              type: 'string',
              nullable: true,
              example: 'Verificar o ar-condicionado',
            },

            status: {
              type: 'string',
              enum: ['AGENDADO', 'CONFIRMADO', 'EM_ATENDIMENTO', 'CONCLUIDO', 'CANCELADO'],
              example: 'AGENDADO',
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
        Usuario: {
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

            email: {
              type: 'string',
              format: 'email',
              example: 'paulo@email.com',
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
      },
    },
  },

  apis: ['./src/modules/**/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
