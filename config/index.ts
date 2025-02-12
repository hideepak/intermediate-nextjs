// config.ts
export const COOKIENAME = 'auth_token';

// In production, store your secret in environment variables:
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
