const express = require('express')
const urlrout = require('./routes/url')
const staticRouter = require("./routes/staticRouter")
const userroute = require("./routes/user")
const { connecttoMongoDb } = require('./connect')
const cookieParser = require("cookie-parser")
const { restricttologgedinuseronly, checkauth } = require('./middlewares/auth')
const path = require("path");
const app = express();
// using static router from routes
const URL = require('./modals/url')

const port = 8001;
// set the view engine to ejs
app.set('view engine', 'ejs');
app.set("views", path.resolve("./Views"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

// app.get("/test",async(req,res)=>{
// const allurls= await URL.find({})
// return res.end(`<html>
// <head></head>
// <body>
// <ol>
// ${allurls.map(url =>`<li>${url.shortId} - ${url.redirectUrl} - ${url.visithistory.length}</li>`).join("")}
// </ol>

// </body>
// </html>
// `)
// });
app.get("/test", async (req, res) => {
    const allurls = await URL.find({})
    return res.render('home', {
        urls: allurls
    })
});


app.use("/url", restricttologgedinuseronly, urlrout)
app.use("/",checkauth, staticRouter)
app.use("/user", userroute)

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    }, {
        $push: {
            visithistory: {
                timestamp: Date.now(),
            },
        }
    })
    res.redirect(entry.redirectUrl);
})



connecttoMongoDb('mongodb://127.0.0.1:27017/Shorturldb')
app.listen(port, () => {
    console.log(`server started at port: ${port}`)
})
