import moment from "moment";

//* 날짜 포맷
export function dateFormat(requestValue, format = "YYYY-MM-DD") {
  if (!requestValue) return "-";
  return moment(requestValue).locale("ko").format(format);
}

//* 날짜 + 시간 포맷
export function dateTimeFormat(requestValue, format = "YYYY-MM-DD HH:mm:ss") {
  if (!requestValue) return "-";
  return moment(requestValue).locale("ko").format(format);
}

//* 숫자 천 단위 ,
export function numberWithComma(requestValue) {
  if (requestValue !== 0 && !requestValue) return "";
  return requestValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
