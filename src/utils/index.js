/**
 * 解决ios输入弹回弹问题
 */
function ios() {
  var isAndroid =
    navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
  var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

  var isReset = true; //是否手动调整页面位置
  var windowHeight = window.innerHeight;
  // ios端
  if (isIOS) {
    //
    document.body.addEventListener('focusin', function() {
      isReset = false;
    });
    //
    document.body.addEventListener('focusout', function() {
      isReset = true;
      setTimeout(function() {
        if (isReset) {
          window.scroll(0, 0);
        }
      }, 300);
    });
  }
  // 安卓端
  else if (isAndroid) {
    window.onresize = function() {
      var resizeHeight = window.innerHeight;
      if (resizeHeight != windowHeight) {
        isReset = false;
      } else {
        isReset = true;
        setTimeout(function() {
          if (isReset) {
            window.scroll(0, 0);
          }
        }, 300);
      }
    };
  }
}

let utils = {};
utils.install = function(Vue) {
  Vue.prototype.$ios = ios;
};
export { utils };
