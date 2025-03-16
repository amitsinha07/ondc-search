const express = require('express');
const { isHeaderValid } = require("ondc-crypto-sdk-nodejs");
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json( { limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

async function getPublicKey(req) {
  const { headers } = req;
  const authHeader = headers.authorization;
  const keyIdMatch = authHeader.match(/keyId="([^"]*)/);
  const keyId = keyIdMatch ? keyIdMatch[1] : null;
  const subscriberId = keyId.split("|")[0];
  
  const response = await axios({
    method: 'post',
    url: `https://preprod.registry.ondc.org/lookup`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      type: "BPP",
      subscriber_id: subscriberId
    }
  });

  return response.data[0].signing_public_key

}


app.post("/on_search", async (req, res) => {
  const {body, headers } = req;
  console.log("on_search---- ", body);
  //const publicKey = await getPublicKey(req);
  //console.log("stringfied body", JSON.stringify(body));
  // const isValid = await isHeaderValid({
  //   header: headers.authorization,
  //   body: JSON.stringify(body),
  //   publicKey: publicKey,
  // });
  // //console.log(isValid);
  // res.send(isValid);
  res.send("Hello, World!");
});

app.post("/on_issue", async (req, res) => {
  const {body, headers } = req;
  console.log("on_search---- ", body);
  //const publicKey = await getPublicKey(req);
  //console.log("stringfied body", JSON.stringify(body));
  // const isValid = await isHeaderValid({
  //   header: headers.authorization,
  //   body: JSON.stringify(body),
  //   publicKey: publicKey,
  // });
  // //console.log(isValid);
  // res.send(isValid);
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
