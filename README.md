# DentalPro

Production-oriented SaaS platform for dental clinics (iOS/Android + API) with multi-tenancy, subscription monetization, and scalable architecture for 10,000+ clinics.

## Tech Stack
- **Mobile**: React Native (Expo + EAS), TypeScript, React Navigation, Zustand, Axios, i18next, SecureStore, React Hook Form + Zod, Reanimated.
- **Backend**: Node.js, Express, PostgreSQL, Prisma, Redis, JWT access/refresh, Bcrypt, Multer, Stripe, Swagger, Winston.
- **Infra**: Docker, docker-compose, Nginx, GitHub Actions CI.

## Monorepo Structure
```
backend/
  prisma/schema.prisma
  src/
    controllers/
    services/
    repositories/
    middlewares/
    validators/
    dtos/
    routes/
    docs/
mobile/
  App.tsx
  src/
    navigation/
    features/
    components/
    i18n/
    store/
    services/
infra/nginx/
docs/legal/
```

## SaaS Capabilities
- Multi-tenant isolation by `clinicId` across all business models.
- 7-day Stripe trial + single auto-renewing subscription.
- API access block when subscription inactive (`402`).
- RBAC roles: `ADMIN`, `DOCTOR`, `MANAGER`.
- Audit logs, rate limiting, Helmet/CORS/HPP hardening.
- Dashboard/Patients/Calendar/Finance/Settings flows in mobile app.
- RU (default) + EN localization switch in-app.

## Backend Run
```bash
cd backend
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev
npm run dev
```

Swagger: `http://localhost:4000/api-docs`

## Mobile Run
```bash
cd mobile
npm install
npm run start
```


## Codespaces + Expo Tunnel (recommended for remote testing)
1. Open project in GitHub Codespaces (default path: `/workspaces/Dental`).
2. Start infrastructure and backend:
   ```bash
   cd /workspaces/Dental
   docker compose up -d postgres redis
   cd backend
   npm install
   cp .env.example .env  # or create manually
   npx prisma generate
   npx prisma migrate dev
   npm run dev
   ```
3. In a second terminal run mobile via tunnel:
   ```bash
   cd /workspaces/Dental/mobile
   npm install
   cat > .env << 'EOF'
   EXPO_PUBLIC_API_URL=https://<your-codespace>-4000.app.github.dev/api/v1
   EOF
   npx expo start --tunnel --clear
   ```
4. Open Codespaces Ports tab and ensure port `4000` is public.
5. Scan QR in Expo Go.

> Important: `EXPO_PUBLIC_API_URL` should include `/api/v1`.

## Deployment (AWS / DigitalOcean)
1. Provision PostgreSQL + Redis (managed preferred).
2. Configure backend environment variables (.env example included).
3. Build and run containers:
   ```bash
   docker compose up -d --build
   ```
4. Put Nginx behind TLS terminator (ALB / Cloudflare / DO LB).
5. Configure Stripe webhook endpoint `/api/v1/billing/webhook`.
6. Configure S3 bucket + IAM access for file uploads.

## App Store / Play Store Readiness
- `mobile/eas.json` prepared for production builds.
- Bundle IDs:
  - iOS: `com.dentalpro.app`
  - Android: `com.dentalpro.app`
- Add real icon/splash assets and store metadata before release.
- Legal templates in `docs/legal`.

## CI/CD
GitHub Actions workflow `.github/workflows/ci.yml` runs lint + backend build.

## Notes on Scaling
- Indexed tenant and date fields in Prisma schema.
- Pagination in patient listing.
- Redis layer ready for caching/rate limiting extension.
- Layered backend architecture for horizontal scaling.
