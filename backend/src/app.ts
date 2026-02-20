import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import { globalRateLimit } from './middlewares/rate-limit.middleware';
import { errorHandler } from './middlewares/error.middleware';
import { env } from './config/env';
import { swaggerSpec } from './docs/swagger';
import { xssSanitizer } from './middlewares/xss.middleware';

export const app = express();

app.use('/api/v1/billing/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '2mb' }));
app.use(cors({ origin: env.corsOrigin }));
app.use(helmet());
app.use(hpp());
app.use(compression());
app.use(morgan('combined'));
app.use(globalRateLimit);
app.use(xssSanitizer);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/v1', routes);

app.use(errorHandler);
