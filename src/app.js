const minimatch = require("minimatch");

async function webhookSubmit(req, res, settings, triggerControllers) {
  try { 
    const body = req.body;
    
    const {page_name: reqPName, page_url: reqPUrl, variant: reqVariant} = body;
    if (!reqPName || !reqPUrl || !reqVariant){
      return res.status(400).send("Bad Check Format");
    }
    console.error("Test");

    triggerControllers.forEach(trigger => {
        const {pageName, pageUrl, variant} = trigger.params;

        console.error("Test1");
        if (pageName && !minimatch(reqPName, pageName)) return;
        
        console.error("Test2");
        if (pageUrl && !minimatch(reqPUrl, pageUrl)) return;
        
        console.error("Test3");
        if (variant && reqVariant !== variant) return;

        console.error("Test4");
        console.error(trigger.execute(`${reqPName} Submitted`, JSON.parse(body["data.json"])));
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