const axios=require('axios');
const httpDeleteUser = async (req, res) => {
  try {
    const resp = await axios.delete(
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
    console.log('resp-->',resp.status);//200 ,use this condition
  } catch (error) {
    console.log("error", error);
  }
};

httpDeleteUser();