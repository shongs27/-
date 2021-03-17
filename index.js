const express = require("express");
const app = express();
const path = require("path");

const cookieParser = require("cookie-parser");

const root = require("./root/key");
const mongoose = require("mongoose");
const connect = mongoose
  .connect(root.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB 접속 완료"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/actors", require("./routes/actors"));

app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 5000;

app.use("/", (req, res) => {
  res.send("안녕하세요 백엔드!");
});

app.listen(port, () => {
  console.log(`서버 ${port}에 록온`);
});
