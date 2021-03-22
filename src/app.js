const { findTriggers } = require(`./helpers`);
const minimatch = require("minimatch");

async function webhookSubmit(req, res) {
  const body = req.body;

  const pageName = body.page_name;
  const pageUrl = body.page_url;
  const variant = body.variant;

  findTriggers(
    JSON.parse(body["data.json"]),
    validateTrigger,
    [ pageName, pageUrl, variant ],
    req, res,
    "webhookSubmit",
    `'${pageName}' submitted`
  );
}

async function validateTrigger(trigger, [ pageName, pageUrl, variant ]) {
  const pageNamePat = (trigger.params.find((o) => o.name === `pageName`).value || "").trim();
  const pageUrlPat = (trigger.params.find((o) => o.name === `pageUrl`).value || "").trim();
  const triggerVariant = (trigger.params.find((o) => o.name === `variant`).value || "").trim();

  // Check if the page name pattern was provided, and if so check it matches request
  if (pageNamePat && !minimatch(pageName, pageNamePat)) {
    throw `Not same page name`;
  }

  // Check if the page URL pattern was provided, and if so check it matches request
  if (pageUrlPat && !minimatch(pageUrl, pageUrlPat)) {
    throw `Not same page URL`;
  }

  if (triggerVariant && triggerVariant !== variant){
    throw `Not same variant`;
  }

  return true;
}

module.exports = { 
  webhookSubmit
};