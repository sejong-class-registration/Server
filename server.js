const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./App");

// MongoDB 랑 연결 후, config.env 채우고 여기 주석 풀기

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;


mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log("DB connection successful!");
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
