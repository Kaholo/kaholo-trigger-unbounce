const minimatch = require("minimatch");

async function webhookSubmit(req, res, settings, triggerControllers) {
  try { 
    const body = req.body;
    
    const {page_name: reqPName, page_url: reqPUrl, variant: reqVariant} = body;
    if (!reqPName || !reqPUrl || !reqVariant){
      return res.status(400).send("Bad Check Format");
    }
    triggerControllers.forEach(trigger => {
        const {pageName, pageUrl, variant} = trigger.params;
        if (pageName && !minimatch(reqPName, pageName)) return
        if (pageUrl && !minimatch(reqPUrl, pageUrl)) return;
        if (variant && reqVariant !== variant) return;
        trigger.execute(`${reqPName} Submitted`, JSON.parse(body["data.json"]));
    });
    res.status(200).send("OK");
  }
  catch (err){
    res.status(422).send(err.message);
  }
}

module.exports = { 
  webhookSubmit
};