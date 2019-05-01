const functions = require("firebase-functions");
const request = require("request");

exports.search = functions.https.onRequest((req, res) => {
  if (req.query.keyword && req.query.keyword !== '') {
    request.post(
      "https://wrapapi.com/use/hshakilst/drugs/medex/latest",
      {
        json: {
          keyword: req.query.keyword,
          wrapAPIKey: "VZkDFOxJfYaNytuvlkHnx4zpcXuGAQIF"
        }
      },
      (error, response, body) => {
        console.log(`statusCode:${response.statusCode}`);
        if (!error && parseInt(response.statusCode) === 200 && body.data) {
          res.status(200).json(body.data["output"]);
        } else {
          res.status(404).json({"msg": "Search results not found!"});
        }
      }
    );
  }
  else if(!(req.query.keyword && req.query.keyword !== '')){
      res.status(400).json({"msg": "Bad Request!"});
  }
  else{
      res.status(500).json({"msg": "Internal server error!"});
  }
});
