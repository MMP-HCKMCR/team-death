exports.getDate = function() {
    let date = new Date();
    let y = date.getFullYear();
    let mo = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let mi = date.getMinutes();
    let s = date.getSeconds();

    return `${y}-${mo}-${d} ${h}:${mi}:${s}.000`;
}