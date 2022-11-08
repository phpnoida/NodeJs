const axios = require("axios");
const httpFullSearch = async () => {
  const toSearch = {
    //  Type 1 : by default uses or
    "query":{
      "match":{
        "extra.fatherName":"salman" //will return all doc where either Flour or 12 anyone of them is present
      }
    }

    // Type 2 : tell elastic to use and instead of or
    // "query":{
    //   "match":{
    //     "name":{
    //       "query":"Bacon Double Smoked",
    //       "operator":"and" //means fetch that doc where all 3 words are present , order not matters
    //     }
    //   }
    // }

    // Type 3 : searching in multiple fields
    // query: {
    //   multi_match: {
    //     query: "fringilla rhoncus.",
    //     fields: ["tags", "description"], //will search values now in both fields tags and description
    //   },
    // },
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
    console.log("full search-->", resp.data);
    console.log("full search-->", resp.data.hits.hits[0]);
    console.log("full search-->", resp.data.hits.hits[1]);
  } catch (err) {
    console.log("full", err);
  }
};

httpFullSearch();
