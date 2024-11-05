const shortid = require('shortid');
const URL = require("../models/url.model.js");

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "Please provide a valid URL" });
    }

    const shortID = shortid.generate();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    });

    return res
        .status(200)
        .json({
            id: shortID,
            message: "Short URL created successfully"
        });
}

async function handleRedirectToURL(req, res) {
     const shortId = req.params.shortId;
     console.log("Received shortId:", shortId);
 
     try {
         const entry = await URL.findOneAndUpdate(
             { shortId },  
             { 
                 $push: {
                     visitHistory: { timestamp: Date.now() }  
                 }
             },
             { new: true }  
         );

 
         if (!entry) {
             return res.status(404).json({ error: "Short URL not found" });
         }
 
         console.log("Entry is:", entry);
         return res.redirect(entry.redirectURL);
     } catch (error) {
         console.error("Error redirecting to URL:", error);
         return res.status(500).json({ error: "An internal error occurred" });
     }
}

async function handleGetAnalytics(req,res) {
     const shortId = req.params.shortId;

     if (!shortId) {
          return res.status(400).json({error:"shortID is not found"})
     }

     const result = await URL.findOne(
          {
               shortId
          }
     );

     // if (!result) {
     //      return res.status(400).json({error:"Please provide valid shortID, shortId not found"})
     // }

     const totalVisitCount = result.visitHistory.length;

     return res
          .status(200)
          .json({
               totalClicks: totalVisitCount,
               analytics:result.visitHistory,
               message:"fetched total counts successfully"
          })


}


module.exports = {
    handleGenerateNewShortUrl,
    handleRedirectToURL,
    handleGetAnalytics
};
