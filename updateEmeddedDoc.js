const axios = require("axios");
// mogodb push for emedded doc
const updateUser = async () => {
  const data = {
    script: {
      source: "ctx._source.address.add(params.address)",
      params: {
        address: {
          line1: "mannat apratment",
          line2: "amitabh bunglow",
          city: "banglore",
          state: "karnataka",
        },
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
    console.log("error", error);
  }
};

updateUser();

//mongodb pull for emedded doc
const updateUser1 = async () => {
  const data = {
    script: {
      source: "ctx._source.address.removeIf(a -> a.city == params.city)",
      params: {
        city: "panaji",
      },
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
    console.log("error", error.data);
  }
};

//updateUser1();

//mongodb $elemMatch for emedded doc
// updating particular record inside embedded doc
const updateUser2 = async () => {
  const data = {
    script: {
      source:
        "def targets = ctx._source.address.findAll(cat -> cat.line1 == 'lig-37'); for(cat in targets) { cat.state = params.address.state }",
      params: {
        address: {
          state: "bihar",
          city: "patna",
          line2: "gaurs school",
          line1: "lig-37",
        },
      },
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
    console.log("error", error.data);
  }
};

//updateUser2();
