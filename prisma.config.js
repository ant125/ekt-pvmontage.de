require("dotenv").config({ path: ".env.local" });
const { defineConfig } = require("prisma/config");

module.exports = defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://user:password@localhost:5432/database",
  },
});
