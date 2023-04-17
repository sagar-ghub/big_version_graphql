const axios = require("axios");
const BASE_URL = "https://stagev2a.rechargkit.biz";

const network = {};

network.getNetwork = async function (url, token) {
  //   console.log("url", url);
  const data = await axios(BASE_URL + url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  //   console.log("da", data);

  return data.data;
};

module.exports = network;
