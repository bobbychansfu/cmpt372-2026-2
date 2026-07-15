const v8 = require('v8');

serialize_data = v8.serialize({'name':'bobby'});

console.log(serialize_data.toString('base64') + "\n");

console.log(v8.deserialize(serialize_data));