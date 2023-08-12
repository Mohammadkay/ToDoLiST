const dotenv = require(`dotenv`).config();
const mongoose = require(`mongoose`);
const app = require(`./app`);
const port = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`port is listing in port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
