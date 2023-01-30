import pg from 'pg';
import dotenv from "dotenv"
import pkg from '@prisma/client';


const { Pool } = pg;

dotenv.config();

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }
});

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export default prisma;
