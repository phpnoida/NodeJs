// alter table/index or add more field to existing table
// Note :in elastic u canot modify data type once it has been created
// so be very careful while defining
// nor we can remove any field once it has been created
// only we ccan add new one
// but in case we want to modify data types, then we will create new index with updated data types and will copy all ddata frrom old index to newly crreated index
// pls check below how to do that

const addField = async () => {
  const schema = {
    properties: {
      createdAt: { type: "date" },
      // "createdAt":{"type":"long"},
      // "createdAt":{
      // "type":"date",
      // "format":"epoch_second" or "dd/MM/yyyy"
      //  epoch_second is used in case u want to supply unix timestmp in seconds rather than miliseconds
    },
  };
  try {
    const resp = await axios.put(
      "https://701bc18ed0ad496e8a14642c0351861b.us-central1.gcp.cloud.es.io:443/reviews/_mapping",
      schema,
      {
        headers: {
          "Content-type": "application/json",
        },
        auth: {
          username: "elastic",
          password: "Fz1tDcLO5TVwOGCdOqjrnrG6",
        },
      }
    );
    console.log("res", resp);
  } catch (error) {
    console.log("err", error);
  }
};

//addField();

// reindexing
// step 1 ,create new index with modified data types

// step 2-->copy all data from old inddex to new index

// POST base_url/_reindex
// body will be {
//   "source":{
//     "index":"oldIndexName"
//   },
//   "dest":{
//     "index":"newIndexName"
//   }
// }
