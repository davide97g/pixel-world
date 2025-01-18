import dotenv from "dotenv";
import postgres from "postgres";
dotenv.config();

const connectionString = process.env.DATABASE_URL;
console.log("DATABASE_URL", connectionString);
if (!connectionString) {
  throw new Error("Please define the DATABASE_URL environment variable");
}
const sql = postgres(connectionString);

export default sql;
