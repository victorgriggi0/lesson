const { sequelize } = require("../infrastructure/database/sequelize");
const { env } = require("../main/config/env");

sequelize
  .sync()
  .then(async () => {
    const { app } = require("../main/config/app");

    app.listen(env.appPort, () => {
      console.log(`Server is running on port ${env.appPort}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
