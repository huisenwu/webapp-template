"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _router = _interopRequireDefault(require("./router"));

var app = (0, _express.default)();
var port = process.env.port || 9080;
app.use("/api", _router.default);
app.use("/static", _express.default.static(_path.default.join(__dirname, "../static"), {
  index: "index.html"
}));
app.listen(port, function () {
  return console.log("Listening on port ".concat(port, "!"));
});