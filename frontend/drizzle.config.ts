import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema.ts",
  dbCredentials: {
    url: "postgres://urlshort:urlshort@localhost:5432/postgres?sslmode=disable",
  },
});
