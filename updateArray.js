const axios = require("axios");
// mongdb push
const updateUser1 = async () => {
  const data = {
    script: {
      source: "ctx._source.phone.add(params.phone)",
      params: {
        phone: "eating",
      },
    },
  };

  try {
    const resp = await axios.post(
      "https://6c34303641ff44759b422345b27742c2.us-central1.gcp.cloud.es.io:443/users/_update/17cd",
      data,
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

    //console.log("res", resp.data);
    console.log("resp-->", resp.status); //200-->apply condition on statusCode
  } catch (error) {
    console.log("error", error.data);
  }
};

updateUser1();

// mongdb pull
const updateUser2 = async () => {
  const data = {
    script: {
      source: "ctx._source.phone.remove(0)", //means remove need index of element to removed
    },
  };

  try {
    const resp = await axios.post(
      "https://6c34303641ff44759b422345b27742c2.us-central1.gcp.cloud.es.io:443/users/_update/15cd",
      data,
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

    //console.log("res", resp.data);
    console.log("resp-->", resp.status); //200-->apply condition on statusCode
  } catch (error) {
    console.log("error", error);
  }
};

//updateUser2();
