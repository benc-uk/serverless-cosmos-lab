const express = require('express');
const router = express.Router();
const documentClient = require("documentdb").DocumentClient;
const client = new documentClient(process.env.DB_ENDPOINT, {
   "masterKey": process.env.DB_KEY
});

// ====================================================================================================
// GET home page (index.ejs)
// ====================================================================================================
router.get('/', function(req, res, next) {
  // Check database & collection settings
  if(!process.env.DB_NAME) {
    process.env.DB_NAME = "mydb";
  }
  if(!process.env.DB_COLLECTION) {
    process.env.DB_COLLECTION = "photos";
  }

  const collectionUrl = ("/dbs/"+process.env.DB_NAME+"/colls/"+process.env.DB_COLLECTION);
  console.log(collectionUrl);
  
  let photoResults = [];

  // Query docs for photos with URL in reverse time order
  client.queryDocuments(collectionUrl, 'SELECT TOP 50 * FROM p WHERE p.url != null AND p.description != null ORDER BY p.time DESC')
  .toArray((err, results) => {
    if(err) {
      sendError(res, err);
      return;
    } else {

      // Loop through results
      for(let photo of results) {
        // Push details into output array
        photoResults.push({
          url: photo.url, 
          caption: titleCase(photo.description.captions[0].text),
          confidence: Math.round(parseFloat(photo.description.captions[0].confidence) * 100),
          tags: photo.description.tags
        });
      }

      // Send result to browser
      res.render('index', { 
        title: 'Azure Cognitive Services - Computer Vision Demo',
        photoResults: photoResults
      });
    }
  });
});

// ====================================================================================================
// Convert string to Title Case
// ====================================================================================================
function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

// ====================================================================================================
// Simple error page wrapper
// ====================================================================================================
function sendError(res, error) {
  console.dir(error);
  
  res.render('error', { 
    message: error.message,
    error: JSON.stringify(error, null, 2)
  });
}

module.exports = router;
