var Util = function () {
  var handler = function (captchaObj) {
    captchaObj.onReady(function () {
      console.info('geetest is ready')
    }).onClose(function () {
      showError(('#btnGetVerfycode'), '请完成验证操作');
    }).onSuccess(function () {
      /* 延迟到动画结束后再alert */
      var lastUTC = new Date(), duration = 1100;
      function _alert (msg) {
        var elapsed = new Date() - lastUTC;
        if (elapsed >= duration) { return alert(msg) }
        setTimeout(function () { alert(msg) }, duration - elapsed);
      }
      var result = captchaObj.getValidate();
      if (!result) { return alert('请完成验证'); }
      $.ajax({
        url: 'gt/validate-userdemo',
        type: 'POST',
        dataType: 'json',
        data: {
          username: $('#nickname').val(),
          password: $('#pwd').val(),
          geetest_challenge: result.geetest_challenge,
          geetest_validate: result.geetest_validate,
          geetest_seccode: result.geetest_seccode
        },
        success: function (data) {
          if (data.status === 'success') {
            _alert('成功获取验证码');
          } else if (data.status === 'fail') {
            _alert('失败，请完成验证');
            captchaObj.reset();
          }
        }
      });
    });
    $('#btnGetVerfycode').click(function () {
      hideError();
      var checkphone = checkPhoneNumber();
      if (checkphone) {
        captchaObj.verify();
      }
    })
    // 更多前端接口说明请参见：http://docs.geetest.com/install/client/web-front/
  };

  $.ajax({
    url: "gt/register-userdemo?t=" + (new Date()).getTime(), // 加随机数防止缓存
    type: "get",
    dataType: "json",
    success: function (data) {

      // 调用 initGeetest 进行初始化
      // 参数1：配置参数
      // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
      initGeetest({
        // 以下 4 个配置参数为必须，不能缺少
        gt: data.gt,
        challenge: data.challenge,
        offline: !data.success, // 表示用户后台检测极验服务器是否宕机
        new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机

        product: "bind", // 产品形式，包括：float，popup
        width: "300px",
        https: true

        // 更多前端配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
      }, handler);
    }
  });
  function showError ($el, msg) { $('.ui-tip', $el.parent().addClass('error')).text(msg); }
  function hideError ($el) {
    if ($el) { $el.parent().removeClass('error') }
    else { $('.error', '.container').removeClass('error') }
  }
  function checkPhoneNumber () {
    var phoneEl = $('#phone');
    var phonenumber = phoneEl.val();
    if (!phonenumber) {
      showError(phoneEl, '请输入手机号！');
      return false;
    }
    var phonereg = /^1\d{10}$/;
    var result = phonereg.test(phonenumber);
    if (!result) {
      showError(phoneEl, '请输入正确的手机号');
    }
    return result;
  }

  $('.agreeprotocol').on('click', function (e) {
    var target = $(e.currentTarget);
    var iel = target.find('i');
    if (iel.hasClass('i-checked')) {
      iel.removeClass('i-checked');
    } else {
      iel.addClass('i-checked');
    }
  });
}
export default Util;