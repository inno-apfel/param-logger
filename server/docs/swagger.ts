import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import {version} from '../package.json'

const stylingOptions = {
  customSiteTitle: 'Paramlogger Backend API Docs',
  customCss: '.topbar { display: none }',
};

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Paramlogger Backend API Docs",
            version
        },
    },
    apis: ['./src/routes/**/*.ts', './docs/schemas.ts']
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app: Express, port: number) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, stylingOptions))

    app.get('docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs;