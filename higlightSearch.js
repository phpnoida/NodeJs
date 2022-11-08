const axios = require("axios");
// ----highlighting matched result ex. users seaches some word in chat history, we will send response to frontend those mathed text in array ----//
const httpHighlightSearch = async () => {
  const toSearch = {
    query: {
      match: {
        //   fieldName (if object then use dot notation)
        "extra.summary": {
          query: "ipsum",
        },
      },
    },
    // separate object for highlight
    highlight: {
      // in which tags highlighted text be bind
      // tags is must
      // result is sent in extra key i.e highlights in array
      pre_tags: ["<strong>"],
      post_tags: ["</strong>"],
      fields: {
        // fieldName
        "extra.summary": {},
      },
    },
  };
  try {
    const resp = await axios.post(
      "https://6c34303641ff44759b422345b27742c2.us-central1.gcp.cloud.es.io:443/users/_search",
      toSearch,

      {
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: "elastic",
          password: "H2qY6x5piSBnekHiT1af8fck",
        },
      }
    );
    console.log("highlight search-->", resp.data.hits.hits[0].highlight);
  } catch (err) {
    console.log("highlight search", err);
  }
};

httpHighlightSearch();
