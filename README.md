# Command Centre Backend

Backend API service for the Bluethyme Command Centre. This service connects to the existing **shared Blogbot MongoDB database** to provide administrative and operational APIs for the Command Centre frontend.

## Technology Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript (strict mode)
- **Database**: MongoDB with Mongoose ODM (connects to shared Blogbot database)
- **Validation**: express-validator + Zod
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Morgan
- **Testing**: Vitest
- **Development**: tsx (TypeScript execution)

## Repository Structure

```
command-centre-backend/
├── src/
│   ├── config/           # Environment configuration
│   ├── constants/        # Application constants (HTTP status codes, etc.)
│   ├── controllers/      # Request handlers (to be implemented)
│   ├── middleware/       # Express middleware (error handling, validation, etc.)
│   ├── models/           # Mongoose models (to be implemented)
│   ├── repositories/     # Data access layer (base repository + implementations)
│   ├── routes/           # API route definitions
│   ├── services/         # Business logic (to be implemented)
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions (database, error handling, async helpers)
│   ├── app.ts            # Express application setup
│   └── server.ts         # Server entry point
├── tests/                # Test files (unit, integration, e2e)
├── .env.example          # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Prerequisites

- **Node.js 20+**
- **MongoDB** (shared Blogbot database instance)
- **Redis** (optional, for caching and sessions)

## Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your configuration
# Required: MONGODB_URI, MONGODB_DB_NAME (must point to shared Blogbot database)

# Start development server
npm run dev
```

## Environment Configuration

See `.env.example` for all available configuration options.

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string (shared Blogbot instance) | `mongodb://localhost:27017` |
| `MONGODB_DB_NAME` | Database name (must be `blogbot` for shared database) | `blogbot` |

### Important: Shared Database Architecture

**This service connects to the existing Blogbot MongoDB database.** It does not create or manage its own database. The `MONGODB_DB_NAME` must be set to `blogbot` to access the shared collections.

Collections in the shared database are managed by the Blogbot backend. This service will define Mongoose models that map to existing collections or new collections specific to Command Centre functionality.

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | HTTP server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `CORS_ORIGIN` | Frontend origin for CORS | `http://localhost:5173` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `LOG_LEVEL` | Logging level | `info` |

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## API Endpoints

### Health Checks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Basic health check |
| GET | `/api/health/ready` | Readiness probe |
| GET | `/api/health/live` | Liveness probe |

### Planned Endpoints (Not Yet Implemented)

| Area | Endpoints |
|------|-----------|
| Authentication | `/api/auth/register`, `/api/auth/login`, `/api/auth/refresh`, `/api/auth/logout` |
| Users | `/api/users` (CRUD) |
| Tenants | `/api/tenants` (CRUD) |
| Analytics | `/api/analytics` |
| Billing | `/api/billing` |
| Audit Logs | `/api/audit-logs` |

## Security Principles

1. **Helmet.js** - Sets secure HTTP headers
2. **CORS** - Configured with explicit origin allowlist
3. **Rate Limiting** - Prevents abuse (configurable window/max requests)
4. **Input Validation** - All inputs validated via express-validator + Zod
5. **Error Handling** - No stack traces in production responses
6. **Environment Secrets** - All secrets via environment variables (never committed)
7. **Shared Database Access** - Read/write access to Blogbot database requires explicit coordination

## Database Connection

The service uses Mongoose to connect to the shared Blogbot MongoDB database. Connection is established in `src/utils/database.ts` and includes:

- Connection pooling (max 10 connections)
- Automatic reconnection handling
- Graceful shutdown on SIGINT/SIGTERM
- Connection status monitoring

## Project Status

**This repository is in the initial setup phase.** The following have been completed:

- [x] Project structure and configuration
- [x] Express.js application with middleware (Helmet, CORS, Rate Limiting, Compression, Logging)
- [x] TypeScript configuration with path aliases
- [x] Environment configuration for MongoDB/Mongoose
- [x] Base repository pattern for data access
- [x] Common type definitions
- [x] Health check endpoints
- [x] Error handling middleware
- [x] Input validation/sanitization middleware

**Not yet implemented (future work):**
- [ ] Mongoose models for Blogbot collections
- [ ] Authentication system (JWT-based)
- [ ] User management APIs
- [ ] Tenant management APIs
- [ ] Analytics/Reporting APIs
- [ ] Billing/Subscription APIs
- [ ] Audit logging
- [ ] API documentation (Swagger/OpenAPI)

## License

MIT