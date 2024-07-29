export function convertDateSqltoJs(date) {
  const newJsDate = date.replaceAll("-", "/");

  return newJsDate;
}

// For for formatting of Date for display
export function dateFormatForDisplaying(date) {
  const jsDate = new Date(date.replaceAll("-", "/"));

  const year = jsDate.getFullYear();
  const month = jsDate.getMonth() + 1;
  const day = jsDate.getDate();
  const formattedDate = day + "/" + month + "/" + year;

  return formattedDate;
}

// For sending date to server formatting for sql date type
export function convertDateJstoSql() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const sqlDate = year + "-" + month + "-" + day;
  return sqlDate;
}
