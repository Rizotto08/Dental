import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DentalPro API',
      version: '1.0.0',
      description: 'Multi-tenant SaaS API for dental clinics'
    },
    servers: [{ url: '/api/v1' }]
  },
  apis: ['src/routes/*.ts']
});
