require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { connectDb } = require("../config/db");
const { User } = require("../models/User");
const { Template } = require("../models/Template");
const { buildTemplateHtmlFromBlocks } = require("../services/templateCompiler");
const { seedPrebuiltTemplates } = require("../services/prebuiltSeeder");
const { dummyUsers, dummyTemplates } = require("../data/dummySeedData");

const seedUsers = async () => {
  const usersByEmail = new Map();

  for (const userData of dummyUsers) {
    const passwordHash = await bcrypt.hash(userData.password, 12);
    const user = await User.findOneAndUpdate(
      { email: userData.email.toLowerCase() },
      {
        $set: {
          name: userData.name,
          email: userData.email.toLowerCase(),
          passwordHash,
          brandSettings: userData.brandSettings
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    usersByEmail.set(user.email, user);
  }

  return usersByEmail;
};

const seedCustomTemplates = async (usersByEmail) => {
  for (const templateData of dummyTemplates) {
    const user = usersByEmail.get(templateData.ownerEmail.toLowerCase());
    if (!user) {
      throw new Error(`Missing seed user for ${templateData.ownerEmail}`);
    }

    const handlebarsTemplate = buildTemplateHtmlFromBlocks({
      blocks: templateData.blocks,
      globalStyles: templateData.globalStyles
    });

    await Template.findOneAndUpdate(
      { user: user._id, name: templateData.name, isPrebuilt: false },
      {
        $set: {
          user: user._id,
          name: templateData.name,
          category: templateData.category,
          description: templateData.description,
          blocks: templateData.blocks,
          globalStyles: templateData.globalStyles,
          handlebarsTemplate,
          isPrebuilt: false
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
};

const run = async () => {
  await connectDb();
  await seedPrebuiltTemplates();
  const usersByEmail = await seedUsers();
  await seedCustomTemplates(usersByEmail);

  const userCount = await User.countDocuments();
  const templateCount = await Template.countDocuments();

  console.log(
    `Dummy data seeded successfully. Users: ${userCount}, Templates: ${templateCount}`
  );
};

run()
  .catch((error) => {
    console.error("Dummy data seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
