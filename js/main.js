$(function() {

    // 点击外层聊天图标
    $('#icon_chatLogo').click(function () {

        $('.chat_wrap').removeClass('animated slideOutRight').show().addClass('animated slideInRight');
    });
    // 点击叉叉关闭图标
    $('.icon_cancelLogo').click(function () {
        $('.chat_wrap').removeClass('animated slideInRight').addClass('animated slideOutRight');
    });
    var newMsg = [],
        msg;
    // 文本域自增高度
    $('#textarea_text').on('keyup keydown', function (event) {
        $('.expandingArea span').html($(this).val());
        // 输入消息点击回车发送消息
        if (event.keyCode == 13) {
            // 如果不全是空格就发送
            if ($(this).val().trim()) {
                msg = $(this).val();
                msg = showEmoji(msg);
                displayNewMsg(msg);
                newMsg.push($(this).val());
                $(this).val('').focus();
                event.returnValue = false;
                return false;
            } else {
                return false;
            }
        }
    });


    // 监视发送图片按钮的变化
    document.getElementById('photoLogo').onchange = function () {
        if (this.files.length != 0) {
            var file = this.files[0],
                reader = new FileReader();
            if (!reader) {
                that._displayNewMsg('系统消息', '你的浏览器不支持读文件，请升级！', 'red');
                this.value = '';
                return;
            }
            ;
            reader.onload = function (e) {
                this.value = '';

                displayImage(e.target.result);
            };
            // 将图片作为base-64解析
            reader.readAsDataURL(file);
        }
    };
    initialEmoji();
    // 点击表情按钮就显示表情
    $('#emojiLogo').on('click', function (event) {
        event.stopPropagation();
        $('#emojiWrapper').removeClass('animated bounceOutDown').show().addClass('animated bounceInUp');
    });
    // 点击其它地方关闭
    document.body.onclick = function (e) {
        var emojiWrap = document.getElementById('emojiWrapper');
        if (e.target != emojiWrap) {
            $('#emojiWrapper').removeClass('animated bounceInUp').addClass('animated bounceOutDown');
        }
    };
    // 点击每一个表情 在输入框显示相应的字符
    document.getElementById('emojiWrapper').onclick = function (e) {
        var target = e.target;
        if (target.nodeName == 'IMG') {
            var messageInput = document.getElementById('textarea_text');
            messageInput.focus();
            messageInput.value += `[emoji:${target.title}]`;
        }
    };

    // 展示消息和表情的函数
    function displayNewMsg(msg) {
        // 通过处理之后的msg
        msg = showEmoji(msg);
        var container = $('.historyMsg'),
            data = new Date().toTimeString().substr(0, 8);
        // 消息显示的模板
        // 判断消息是来自客服还是自己
        var me = false;
        if (me) {
            var msgToDisplay = $(`<div class="newmsgWrap clearfix">
            <div id='allNewmsg' class="newcusMsg">
              <span>${msg}</span>
              <p class="shoWDate">${data}</p>
            </div>

          </div>`);
        } else {
            var msgToDisplay = $(`<div class="newmsgWrap clearfix">
      <img class='kefu-photo' src='./img/kefu/1.png' />
            <div id='allNewmsg' class="newserMsg">
              <i class='iconfont icon-gongDan' id='icon-gongDan'>&#xe608;填写工单</i>
              <span>${msg}</span>
              <p class="shoWDate">${data}</p>
            </div>

          </div>`);
        }

        // 等页面全部渲染之后再改变滚动条位置
        setTimeout(function () {
            container.scrollTop(container[0].scrollHeight);
            if ($('#icon-gongDan').length > 0) {
                //点击工单弹出工单填写页面
                $('#icon-gongDan').on('click', function () {
                    $('.workOrder-wrap').removeClass('animated bounceOutDown').show().addClass('animated slideInRight');
                });
                // 点击关闭工单
                $('#close').on('click', function () {
                    $('.workOrder-wrap').removeClass('animated slideInRight').addClass('animated bounceOutDown');
                });
                // 点击提交也关闭工单
                $('#workOrder-sub').on('click', function () {
                    $('.workOrder-wrap').removeClass('animated slideInRight').addClass('animated bounceOutDown');
                });
            }
        }, 0);
        container.append(msgToDisplay);
    }

    // 展示图片的函数
    function displayImage(imgData) {
        var container = $('.historyMsg'),
            data = new Date().toTimeString().substr(0, 8),
            msgToDisplay = $(`<div class="newmsgWrap clearfix">
      <div class="newcusMsg">
      <a href='${imgData}' target='_blank'>
      <img src='${imgData}'/>
      </a>
        <p class="shoWDate">${data}</p>
      </div>

    </div>`);
        container.append(msgToDisplay);
        setTimeout(function () {
            container.scrollTop(container[0].scrollHeight);
        }, 0);
    }

    // 初始化表情
    function initialEmoji() {
        var emojiContainer = document.getElementById('emojiWrapper'),
            // 先创建一个文档碎片 然后再一次性添加
            docFragment = document.createDocumentFragment();
        for (var i = 60; i > 0; i--) {
            var emojiItem = document.createElement('img');
            emojiItem.src = './img/emoji/emo_' + i + '.gif';
            emojiItem.title = i;
            docFragment.appendChild(emojiItem);
        }
        emojiContainer.appendChild(docFragment);
    }

    // 展示表情的函数
    function showEmoji(msg) {
        var reg = /\[emoji:(\d+)\]/g;
        if (reg.exec(msg)) {
            msg = msg.replace(reg, `<img src="./img/emoji/emo_${'$1'}.gif" />`);
        }
        return msg;
    }

    // 工单中的上传图片
    function upload_img() {
        if (this.files.length != 0) {
            var file = this.files[0],
                reader = new FileReader();
            if (!reader) {
                alert('你的浏览器不支持读文件，请升级！');
                return;
            }
            ;
            var photoType = $(this).val().substring($(this).val().lastIndexOf(".") + 1).toLowerCase();
            if (photoType != 'png' && photoType != 'gif' && photoType != 'jpg' && photoType != 'svg' && photoType != 'jpeg') {
                $('.showAlert').removeClass('animated fadeOutUp').show().addClass('animated bounceIn');
                setTimeout(function () {
                    $('.showAlert').removeClass('animated bounceIn').addClass('animated fadeOutUp');
                }, 2000);
                // 防止选择同一个文件没反应
                this.value = '';
                return;
            } else {
                reader.onload = function (e) {
                    var pic = document.getElementById("preview");
                    pic.src = this.result;
                };
                // 将图片作为base-64解析
                reader.readAsDataURL(file);
                this.value = '';
            }
        }
    }

    document.getElementById('upload_img').onchange = function () {
        upload_img.bind(this)();
    };
    //工单中的取消上传图片
    document.getElementById('cancel_upload').onclick = function () {
      // var preview=document.getElementsByClassName("preview-img");
        var pic = document.getElementById("preview");
         pic.src="./img/not-choose.jpg";

    }


});