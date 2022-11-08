const axios=require('axios');

// get base_url/tableName/_doc/itemId
const httpGetOneDoc = async (req, res) => {
  try {
    const resp = await axios.get(
      "https://6c34303641ff44759b422345b27742c2.us-central1.gcp.cloud.es.io:443/users/_doc/15cd",
      {
        headers: {
          "Content-type": "application/json",
        },
        auth: {
          username: "elastic",
          password: "H2qY6x5piSBnekHiT1af8fck",
        },
      }
    );

    console.log("res", resp.data._source);
  } catch (error) {
    console.log("error", error);
  }
};

httpGetOneDoc();