import {config} from 'dotenv'
config();

export default{
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'root',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME
}
export {config}
