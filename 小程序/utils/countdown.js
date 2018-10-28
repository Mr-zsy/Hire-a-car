/** 
 * 需要一个目标日期，初始化时，先得出到当前时间还有剩余多少秒
 * 1.将秒数换成格式化输出为XX天XX小时XX分钟XX秒 XX
 * 2.提供一个时钟，每10ms运行一次，渲染时钟，再总ms数自减10
 * 3.剩余的秒次为零时，return，给出tips提示说，已经截止
 */
// 定义一个总毫秒数，以一天为例
//var total_micro_second = 3600 * 1000*24;//这是一天倒计时
var total_micro_second = 10 * 1000;//这是10秒倒计时

/* 毫秒级秒杀倒计时 */
function countdown(that) {
  // 渲染倒计时时钟
  that.setData({
    clock: dateformat(total_micro_second)//格式化时间
  });
  if (total_micro_second <= 0) {
    that.setData({
      // clock: [{
      //   'message': '秒杀结束'
      // }]
      clock:'秒杀结束'
    });
    // timeout则跳出递归
    return;
  }
  //settimeout实现倒计时效果
  setTimeout(function () {
    // 放在最后--
    total_micro_second -= 10;
    countdown(that);
  }
    , 10)//注意毫秒的步长受限于系统的时间频率，于是我们精确到0.01s即10ms
}
// 时间格式化输出，如1天天23时时12分分12秒秒12 。每10ms都会调用一次
function dateformat(micro_second) {
  // 总秒数
  var second = Math.floor(micro_second / 1000);
  // 天数
  var day = Math.floor(second / 3600 / 24);
  // 总小时
  var hr = Math.floor(second / 3600);
  // 小时位
  var hr2 = hr % 24;
  // 分钟位
  var min = Math.floor((second - hr * 3600) / 60);
  // 秒位
  var sec = (second - hr * 3600 - min * 60);// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = Math.floor((micro_second % 1000) / 10);
  // return [
  //   {
  //     'message': hr2 + ":"
  //   },
  //   {
  //     'message': min + ":"
  //   },
  //   {
  //     'message': sec
  //   }]
  return `${hr2}:${min}:${sec}`
}

export { countdown };