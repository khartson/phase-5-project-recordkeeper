export function createIconUrl(xml) {
  const svg = new Blob ([xml], { type: "image/svg+xml"});
  return URL.createObjectURL(svg);
}