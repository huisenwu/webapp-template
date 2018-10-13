import express from "express";
import path from "path";

const app = express();
const port = process.env.port || 9080;

app.use("/static", express.static(path.join(__dirname, "../static"), {index: "index.html"}));

app.listen(port, () => console.log(`Listening on port ${port}!`));
