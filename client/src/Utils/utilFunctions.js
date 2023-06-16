export const ISOTodate = (date) => {
  let d = new Date(date)
  let year = d.getFullYear();
  let month = d.getMonth()+1;
  let dt = d.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }

  if (month < 10) {
    month = '0' + month;
  }

  return `${dt}/${month}/${year}`
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
export const blogDate = (date) => {
  let d = new Date(date)
  let month = d.getMonth();
  let dt = d.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }

  return `${dt} ${months[month]}`
}