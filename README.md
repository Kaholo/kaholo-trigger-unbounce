# kaholo-trigger-unbounce
Simple webhook trigger for Unbounce

## How to use:
After installing the plugin on Kaholo,
Follow this [documentation](https://documentation.unbounce.com/hc/en-us/articles/203510044-Using-a-Webhook) to define a webhook on your unbounce account. 

## Form Submit:
Triggers whenever someone submits a form connected to the webhook.

### Webhook URL:
**{KAHOLO_URL}/webhook/unbounce/submit**

### Parameters:
1. Page Name Pattern - Page name or name [minimatch pattern](https://github.com/isaacs/minimatch#readme).
2. Page URL Pattern - Page URL or URL [minimatch pattern](https://github.com/isaacs/minimatch#readme). 
3. Variant - This identifies the page variant that the visitor saw when they visited your page, and will be a lower-case letter. The first variant is “a”, the next, “b”, and so on.