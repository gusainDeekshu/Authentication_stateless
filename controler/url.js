const shortid = require('shortid')
const URL = require('../modals/url')

// async function handelgenerateshortUrls(req, res) {
//     const body = req.body;
//     if (!body.url) return res.status(400).json({ error: "url is required" })

//     const shortId = shortid();


//     await URL.create({
//         shortId: shortId,
//         redirectUrl: body.url,
//         visithistory: []
//     });
//     return res.json({ id: shortId })
// }
async function handelgenerateshortUrls(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" })

    const shortId = shortid();


    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visithistory: [],
        createdby: req.user._id,
    });
    return res.render("home",{
        id: shortId
    })
}

async function handelgetanalytics(req, res) {
const shortId=req.params.shortId;
const result=await URL.findOne({shortId });
    return res.json({ totalclicks: result.visithistory.length,
    analytics: result.visithistory })
}

module.exports = { handelgenerateshortUrls,handelgetanalytics }