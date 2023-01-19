export function createIconUrl(xml) {
  const svg = new Blob ([xml], { type: "image/svg+xml"});
  return URL.createObjectURL(svg);
}

export function formatDate(dateString) {
  let date = new Date(dateString),
    day = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear(),
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return day + ' ' + months[month] + ' ' + year;
}