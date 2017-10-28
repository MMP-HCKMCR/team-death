exports.getDate = function() {
    let date = new Date();
    let y = date.getFullYear();
    let mo = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let mi = date.getMinutes();
    let s = date.getSeconds();
    let ms = date.getMilliseconds();

    return `${y}-${mo}-${d} ${h}:${mi}:${s}.${ms}`;
}

exports.parseDate = function(idate) {
    let ts = Date.parse(idate);
    let date =  new Date(ts);
    let y = date.getFullYear();
    let mo = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let mi = date.getMinutes();
    let s = date.getSeconds();
    let ms = date.getMilliseconds();

    return `${y}-${mo}-${d} ${h}:${mi}:${s}.${ms}`;
}