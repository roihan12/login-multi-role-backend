import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import ProductsRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import db from "./config/Database.js";
import SequelizeStore  from "connect-session-sequelize";

dotenv.config();

const app = express();

const sessionStore= SequelizeStore(session.Store)
const store =  new sessionStore({
  db:db
})

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store:store,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(UserRoute);
app.use(ProductsRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log(`listening on http://localhost:${process.env.APP_PORT}`);
});