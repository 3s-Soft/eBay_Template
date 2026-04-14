require("dotenv").config();
const { connectDb } = require("./config/db");
const { app } = require("./app");
const { seedPrebuiltTemplates } = require("./services/prebuiltSeeder");

const port = Number(process.env.PORT || 5000);

const start = async () => {
  await connectDb();
  await seedPrebuiltTemplates();

  app.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });
};

start().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
