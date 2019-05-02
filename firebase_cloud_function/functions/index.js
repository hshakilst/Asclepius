const functions = require("firebase-functions");
const request = require("request");

exports.search = functions.https.onRequest((req, res) => {
  if (req.query.keyword && req.query.keyword !== "" && req.method === "POST") {
    var url =
      "https://dgda.gov.bd/administrator/components/com_jcode/source/serverProcessing.php";

    //set header
    var headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    //set form data
    var form = {
      action: "getDrugCompanyDatabaseSearchPriceData",
      FilterAll: 4,
      FilterItem: req.query.keyword
    };

    //set request parameter

    request.post(
      { headers: headers, url: url, form: form, method: "POST" },
      (error, response, body) => {
        if (!error && parseInt(response.statusCode) === 200 && body) {
          res.status(200).send(body);
        } else {
          res.status(404).json({ msg: "Search results not found!" });
        }
      }
    );
  } else if (
    !(req.query.keyword && req.query.keyword !== "" && req.method === "POST")
  ) {
    res.status(400).json({ msg: "Bad Request!" });
  } else {
    res.status(500).json({ msg: "Internal server error!" });
  }
});
