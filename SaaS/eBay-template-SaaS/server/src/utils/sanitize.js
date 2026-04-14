const SCRIPT_TAG_REGEX = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
const INLINE_HANDLER_REGEX = /\son\w+="[^"]*"/gi;
const JS_URL_REGEX = /\s(href|src)="javascript:[^"]*"/gi;

const sanitizeEbayHtml = (html) => {
  if (!html) {
    return "";
  }

  return html
    .replace(SCRIPT_TAG_REGEX, "")
    .replace(INLINE_HANDLER_REGEX, "")
    .replace(JS_URL_REGEX, "");
};

module.exports = { sanitizeEbayHtml };
