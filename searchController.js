const axios = require("axios");
const httpGetAllProducts = async (req, res) => {
  console.log("from all products..");
  const toSearch = {};
  // sorting
  if (req.query.sort) {
    const sort = req.query.sort;
    if (sort == "price") {
      toSearch.sort = [{ price: "desc" }];
    }
    if (sort == "sold") {
      toSearch.sort = [{ sold: "desc" }];
    }
  }

  // projection
  if(req.query.project){
    const project=req.query.project.split(',');
    toSearch._source=project;
  }

  // search full text
  if(req.query.searchKeyword){
    const sk=req.query.searchKeyword;
    toSearch.query={
      bool:{
        must:[
          {
            match:{
              name:sk
            }
          }
        ]
      }
        }
  }

  //filters

  // pagination
  const limit=req.query.limit*1||2;
  const page=req.query.page*1||1;
  const skip=(page-1)*size;

  try {
    
    const resp = await axios.post(
      `https://6c34303641ff44759b422345b27742c2.us-central1.gcp.cloud.es.io:443/products/_search?size=${limit}&from=${skip}`,
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
    //console.log('resp',resp.data.hits)
    res.status(200).json({
      status: true,
      totalRec: resp.data.hits.total.value,
      products: resp.data.hits.hits,
    });
  } catch (err) {
    console.log("bool", err);
  }
};

module.exports = httpGetAllProducts;
