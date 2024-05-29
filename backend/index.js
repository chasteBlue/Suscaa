import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./route/UserRoute.js";
import AppointmentRoute from "./route/AppointmentRoute.js";
import AuthRoute from "./route/AuthRoute.js";
import MeetingsRoute from "./route/MeetingsRoute.js"
import SequelizeStore from "connect-session-sequelize";
import db from "./config/Database.js";

dotenv.config();
const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db:db
});

//(async()=>{
  //  await db.sync();
//})()

app.use(session({
    secret:process.env.SESS_SECRET,
    resave:false,
    saveUninitialized:true,
    store:store,
    cookie:{
        secure:'auto'
    }
}))

app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}))

app.use(express.json());

app.use(UserRoute);
app.use(AppointmentRoute);
app.use(AuthRoute);
app.use(MeetingsRoute);

//store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server is running...')
})