import dotenv from 'dotenv';

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  HOST: process.env.HOST || 'localhost',

  // MongoDB Configuration (shared Blogbot database)
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/blogbot',
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'blogbot',

  // JWT Configuration (for future auth implementation)
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'your-super-secret-access-key-change-in-production-min-32-chars',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-in-production-min-32-chars',
  JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY || '15m',
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || '7d',
  JWT_ISSUER: process.env.JWT_ISSUER || 'command-centre',
  JWT_AUDIENCE: process.env.JWT_AUDIENCE || 'command-centre-users',

  // Redis (optional, for caching/sessions)
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5174/',
  CORS_CREDENTIALS: process.env.CORS_CREDENTIALS === 'true',

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),

  // Email (for future notifications)
  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.example.com',
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT || '587', 10),
  EMAIL_USER: process.env.EMAIL_USER || 'noreply@example.com',
  EMAIL_PASS: process.env.EMAIL_PASS || 'password',
  EMAIL_FROM: process.env.EMAIL_FROM || 'Command Centre <noreply@example.com>',

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  LOG_FORMAT: process.env.LOG_FORMAT || 'json',

  // API Documentation
  SWAGGER_ENABLED: process.env.SWAGGER_ENABLED === 'true',
  SWAGGER_PATH: process.env.SWAGGER_PATH || '/api-docs',

  // Development Authentication Bypass
  DEV_AUTH_BYPASS: process.env.DEV_AUTH_BYPASS === 'true',
};

export const isDevelopment = config.NODE_ENV === 'development';
export const isProduction = config.NODE_ENV === 'production';
export const isTest = config.NODE_ENV === 'test';