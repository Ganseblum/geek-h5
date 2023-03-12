 export const formDate = (dat: Date|null) => {
    let now = new Date(dat as Date);
    let year = now.getFullYear(); //得到年份
    let month = now.getMonth(); //得到月份
    let date = now.getDate(); //得到日期
    month = month + 1;
    if (month < 10) month = parseInt("0" + month);
    if (date < 10) date = parseInt("0" + date);
    let time = year + "-" + month + "-" + date;
    return time
  };