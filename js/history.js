;
$(function() {
  $('.icon_setLogo').on('click', function() {
    // 客服显示 按钮显示
    $('.TruepaasKefu').show();
    $('.writeMsg').removeClass('animated bounceOutDown').show();
    // 返回按钮隐藏 主体消息区隐藏 下面输入消息区隐藏 表情区隐藏
    $('#emojiWrapper').hide();
    $('.icon_setLogo').hide();
    $('.historyMsg').hide();
    $('.footer_msg').hide();
    $('.animateShowFooter').removeClass('animated bounceInUp');
    // 头部变换名字
    $('.header_text p').text('Truepaas');
  });
  // 点击新消息按钮就显示新消息页面
  $('.writeMsg').on('click', function() {
    $('.TruepaasKefu').hide();
    $('.writeMsg').addClass('animated bounceOutDown');
    $('.icon_setLogo').show();
    $('.historyMsg').show();
    $('.footer_msg').show();
    $('.animateShowFooter')
      .addClass('animated bounceInUp');
    $('.header_text p').text('新消息');
  });



});
// 点击返回按钮就显示Truepaas页面
