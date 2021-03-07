const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const liveReload = require('livereload');
const cookieParser = require("cookie-parser");
require('dotenv').config();

// Init app
const app = express();
const PORT =  process.env.PORT || 8000;

// Middleware Func
const errorMiddleware = require('./middleware/error.middleware');

// Route File Import
const ApiRoutes = require('./routes/api_v1/ApiRoutes');
// Router page import
const homeRoutes = require('./routes/page/homeRoutes');
const waifuRoutes = require('./routes/page/waifuRoutes');
const authRoutes = require("./routes/page/authRoutes");

const auth = require("./middleware/auth.middleware");


app.set('views',path.join(__dirname,'../public/views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../public')));
app.use('/assets',express.static(path.join(__dirname,'../public/assets')));


if( process.env.NODE_ENV == 'development' ) {
    const connectLiveReload = require('connect-livereload');
    const publicDir = path.join(__dirname,'../public');
    const liveReloadServer = liveReload.createServer();
    liveReloadServer.watch(publicDir);
    liveReloadServer.server.once("connection",() => {
        console.log('connection successfully');
        setTimeout(() => {
            liveReloadServer.refresh('/')
        },100);
    })


    app.use(connectLiveReload());
}



app.get('/',homeRoutes);

// Views middleware
app.use('/waifu',waifuRoutes);
app.use('/auth',authRoutes);
// API middleware
app.use('/api/wairent/v1',ApiRoutes);



app.use(errorMiddleware);


app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
})

