const express = require("express");
const app = express();

const port = process.env.PORT || 3001;
app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server is listening on port ${port}...`);
});
