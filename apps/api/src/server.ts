import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("");
  console.log("=======================================");
  console.log(" Guard Landscaping AI");
  console.log(` API running on port ${PORT}`);
  console.log("=======================================");
  console.log("");
});
