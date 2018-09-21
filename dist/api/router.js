"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var router = _express.default.Router();

router.get("/courses", function (req, res) {
  res.json([{
    name: "Java",
    description: "A Java course"
  }, {
    name: "React",
    description: "A React course"
  }, {
    name: "TIBCO",
    description: "A TIBCO course"
  }]);
});
var _default = router;
exports.default = _default;