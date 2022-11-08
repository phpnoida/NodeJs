//syntax : axios.put('url/tableName/_doc/docIdwhichuwant')
// docIdwhichuwant -->may be u will be getting this from mongodb
// put not post bcz we want to give custom docId in elastic
// if we use post then elastic will assign it's own id

const axios = require("axios");

const addUser = async () => {
  const data = {
    userId: "17cd",
    fName: "snigdha",
    lName: "anand",
    email: "snigulc@gmail.com",
    isActive: true,
    // Note:must assign blank [] for array and embedded columns
    phone: [],
    address: [],
  };

  try {
    const resp = await axios.put(
      "https://6c34303641ff44759b422345b27742c2.us-central1.gcp.cloud.es.io:443/users/_doc/17cd",
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

    console.log("res", resp.data);
    console.log("resp-->", resp.status); //201 ,apply condition on statusCode
  } catch (error) {
    console.log("error", error);
  }
};

addUser();
