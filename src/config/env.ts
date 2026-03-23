import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT) || 3000,

  jwtSecret: process.env.JWT_SECRET || 'change_me',

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    name: process.env.DB_NAME || 'credential_mailer',
  },

  credentialsApiUrl: process.env.CREDENTIALS_API_URL || "",
  projectId: process.env.PROJECT_ID || ""
};