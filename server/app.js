const Express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = Express();
app.use(cors());

mongoose.connect(
  "Put your own DB direction"
);
mongoose.connection.once("open", () => console.log("DB connected"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => console.log("Listening at port 4000"));
