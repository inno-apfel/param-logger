import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import {version} from '../package.json'

const options = {
  customSiteTitle: 'Paramlogger Backend API Docs',
  customCss: '.topbar { display: none }',
  swaggerOptions: {
    defaultModelsExpandDepth: -1
  }
};

const config: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Paramlogger Backend API Docs",
            version
        },
    },
    apis: ['./src/routes/**/*.ts', './docs/schemas.ts']
}

const swaggerSpec = swaggerJsdoc(config)

function swaggerDocs(app: Express, port: number) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options))

    app.get('docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs;