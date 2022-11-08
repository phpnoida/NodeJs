const axios=require('axios');

const httpBool = async () => {
  const toSearch = {
    // projection means what field u want to send to frontend
    _source: ["name", "price"],
    // query logic
    query: {
      bool: {
        // put all in must arrray which u wants to do full text searching
        must: [
          {
            match: {
              name: "red",
            },
          },
        ],
        // put all inside must_not array which u wants not to contain in doc
        must_not: [
          {
            match: {
              //"tags.keyword":"Wine"
              sold: 1478,
            },
          },
        ],
        // optional , prefernce , relevant scoring boost
        should: [
          {
            match: {
              description: "Quisque",
            },
          },
        ],
        // put all inside filter array for which u wants exact match
        filter: [
          {
            range: {
              price: {
                gte: 100,
              },
            },
          },
        ],
      },
    },
    // sorting
    sort: [
      { price: "desc" },
      // {"createdAt":"asc"}
    ],
    // sorting on field containing array of numbers or float
    sort: [
      {
        examScores: "desc",
        mode: "avg" || "max or min or sum",
      },
    ],
  };
  try {
    // for pagination used size and from in query parameter
    const resp = await axios.post(
      "https://701bc18ed0ad496e8a14642c0351861b.us-central1.gcp.cloud.es.io:443/products/_search?size=3&from=3",
      toSearch,

      {
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: "elastic",
          password: "Fz1tDcLO5TVwOGCdOqjrnrG6",
        },
      }
    );
    console.log("bool search-->", resp.data);
    console.log("bool search-->", resp.data.hits.hits[0]);
    console.log("bool search-->", resp.data.hits.hits[1]);
  } catch (err) {
    console.log("bool", err);
  }
};