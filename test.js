const axios = require("axios");

async function test() {
  const respond = await axios.get("http://127.0.0.1:5000");
  console.log(respond.data);
}

test();
