const axios=require('axios');

const fuzzySearch =async()=>{
    const toSearch={
        query:{
            match:{
                // fName is fieldName
                fName:{
                    query:"amiti",
                    // this is doing magic
                    fuzziness:"auto"
                }
            }
        }
    }
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
      console.log("fuzzy search-->", resp.data.hits);
    } catch (err) {
      console.log("fuzzy search", err);
    }
}

fuzzySearch();