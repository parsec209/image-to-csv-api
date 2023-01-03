swaggerJsdoc = require('swagger-jsdoc')


const HOST = process.env.DEV_HOST || 'localhost'
const PORT = process.env.DEV_PORT || 3000

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Image-To-CSV API',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://${HOST}:${PORT}`
      }
    ]
  },
  //relative to root directory
  apis: ['./src/routes/api/*.js']
}


module.exports = swaggerJsdoc(options)



  
