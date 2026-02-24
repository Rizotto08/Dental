import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  databaseUrl: process.env.DATABASE_URL ?? '',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'access-secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? 'refresh-secret',
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? '',
  s3Bucket: process.env.S3_BUCKET ?? '',
  corsOrigin: process.env.CORS_ORIGIN ?? '*'
};
