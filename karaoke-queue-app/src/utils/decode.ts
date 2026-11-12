export function decodeXML(text : string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html"); // or "application/xml"
  return doc.documentElement.textContent;
}