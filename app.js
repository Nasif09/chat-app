const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");


const { errorHandler,notFoundHandler } = require("./middlewares/common/errorHandler");
const loginRouter = require("./router/loginRouter");
const inboxRouter = require("./router/inboxRouter");
const userRouter = require("./router/userRouter");

const app = express();
dotenv.config();


//database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Database connection successful"))
.catch((err) => console.log(err));

//request  parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//set view engine
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

//route setup
app.use('/', loginRouter);
app.use('/inbox', inboxRouter);
app.use('/users', userRouter);

//404 not found handler
app.use(notFoundHandler);

//common error handeling
app.use(errorHandler);

app.listen(process.env.PORT,()=> {
    console.log(`app listen to port ${process.env.PORT}`)
})