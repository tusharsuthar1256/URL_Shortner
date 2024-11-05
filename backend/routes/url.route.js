const express = require('express');
const {handleGenerateNewShortUrl,handleRedirectToURL, handleGetAnalytics} = require("../controllers/url.controller.js");
 
const router = express.Router();

router.post("/",handleGenerateNewShortUrl)
router.get("/:shortId", handleRedirectToURL);
router.get("/analytics/:shortId",handleGetAnalytics)

module.exports = router;