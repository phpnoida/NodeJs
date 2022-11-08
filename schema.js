/*
table in elastic is called as index
Mapping means defining schema for table/index
Two types of mapping :explicit and implicit
explicit -->we define data types
implicit -->elastic decide based on supplied values
implicit or dynamic mapping is enabled by default but it takes more disk space bcz most of the time it uses multi data type concept on the same field

but it is recommended to disable dynamic mapping if you want to have full control
full control means , we cannot add those fields which are not defined in schema/mappings

*/

/*
Data Types:
c1:{
    type:Number(mongo)|integer(elastic)(int will not work)|long(elastic)
}
// for storing decimal values
c2:{
    type:Number|float|double
},
c3:{
    type:Boolean|boolean
},
c4:{
    type:String|text(elastic)|keyword(elastic)
}
Expl:Diff between text and keyword ?
a.If we have to do full text searching on c4 then use text
b.In case if you want to do exact matching then use keyword
filters,sorting,email here we want to match exact
c.But what if we don't want to do anykind of searching i.e
neither full searching nor exact searching in that case:
index:false we pass this extra key with text datatype

// dates (but pls store in epoch milisec not in seconds)
// elastic needs miliseconds only not in seconds
c5:{
    type:Number|long
}
// object
c6:{
    type:Object|object(elastic)
},
// Array of objects(embedded doc)
c7:[{}]|{
    type:"nested"
}

// Array
c8:{
    type:[Number]|text(elastic)
    Expla:in elastic there is no Array datatype
    but we can pass [] from controller,elastic will store array
    and that is useful infact,will help in doing searching
    even data stores in Array very easily
}


*/

const axios = require("axios");

const createUserIndex = async () => {
  const schema = {
    mappings: {
      dynamic:"strict",//dynamic mapping will be disabled now
      properties: {
        userId: { type: "text" ,index:false},
        fName: { type: "text" },
        lName: { type: "text" },
        email: { type: "keyword" },
        isActive: { type: "boolean" },
        salary: { type: "float" },
        attendance: { type: "long" },

        // object , no need to specify type:object
        extra: {
          properties: {
            fatherName: { type: "text" },
            motherName: { type: "text" },
            summary: { type: "text" },
          },
        },
        // array of object
        address: {
          type: "nested",
          properties: {
            line1: { type: "text" },
            line2: { type: "text", index: false },
            city: { type: "keyword" },
            state: { type: "keyword" },
          },
        },
        phone: {
          type: "text",
        },
        createdAT: {
          type: "long",
        },
        //multi field mapping means we can define 2 different data types for the same column
        description:{
          type:"text",
          fields:{
            //any name u can give but convention is to keep keyword
            keyword:{
              type:"keyword"
            }
          }
        }
      },
    },
  };
  try {
    const resp = await axios.put(
      "https://6c34303641ff44759b422345b27742c2.us-central1.gcp.cloud.es.io:443/users",
      schema,
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
    console.log("res-->", resp.data);
  } catch (error) {
    console.log("error", error);
  }
};

createUserIndex();
