const env = {
  database: {
    userName: process.env.DATABASE_USERNAME ?? "",
    password: process.env.DATABASE_PASSWORD ?? "",
    name: process.env.DATABASE_NAME ?? "",
    host: process.env.DATABASE_HOST ?? "",
    port: process.env.DATABASE_PORT ?? "",
    dialect: process.env.DATABASE_DIALECT ?? "",
  },
  s3: {
    accessKey: process.env.AWS_S3_ACCESS_KEY_ID ?? "",
    secret: process.env.AWS_S3_SECRET_ACCESS_KEY ?? "",
    bucket: process.env.AWS_S3_BUCKET ?? "",
  },
  appPort: process.env.PORT ?? 3333,
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY ?? "",
    expirationInMs: process.env.JWT_SECRET_EXPIRES_IN ?? "",
  },
};

module.exports = { env };
