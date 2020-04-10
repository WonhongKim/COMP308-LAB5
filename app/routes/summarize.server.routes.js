var summarize = require("../controllers/summarize.server.controller");
var express = require("express");
var router = express.Router();

module.exports = function (app) {
  app.post("/api/summarize", summarize.summarizeContents);
  app.post("/api/summarizewithInput", summarize.summarizeContentswithInput);
};
