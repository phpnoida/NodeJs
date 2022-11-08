const axios = require("axios");
const httpTermSearch = async () => {
  const toSearch = {
    // Type1 : single field search
    // query: {
    //   term: {
    //    // isActive:false,
    //   },
    // },

    // Type2 : multiple field search
    // Note :term is case sensitive , so i would suggest store all in lowercase in db and when users is searching anything send data in lowercase only then it will work very fine
    query: {
      terms: {
        // Type1 eqivalent to $in
        //"price":[195,139],
        // Type2 search on array field
        //"phone":["gurgoan","netflix"],
      },
    },

    // Type3 : search by ID
    // query:{
    //   ids:{
    //     values:[81,2]
    //   }
    // }

    // Type4 :ranges $gte $lte
    // query:{
    //   "range":{
    //     "in_stock":{
    //       "gte":20,
    //       "lte":22
    //     }
    //   }
    // }
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
    console.log("search-->", resp.data.hits); //data is recieved in array under hits
    console.log("term search-->", resp.data.hits.hits[0]);
    console.log("term search-->", resp.data.hits.hits[1]);
  } catch (err) {
    console.log("er", err);
  }
};
httpTermSearch();
