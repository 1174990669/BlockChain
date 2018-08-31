var GLOBAL = {};
GLOBAL.namespace = function(str){
    var arr = str.split('.'),o = GLOBAL;
    for(i = (arr[0] == GLOBAL)?1:0;i<arr.length;i++){
        o[arr[i]] = o[arr[i]]||{};
        o = o[arr[i]];
    }
}
GLOBAL.namespace("Dom");
GLOBAL.Dom.getElementsByClassName = function(str,root,tag){
    if(root){
        root = (typeof root == "string")?document.getElementById(root):root;
    }else{
        root = document.body;
    }
    tag = tag||'*';
    var els = root.getElementsByTagName(tag),arr = [];
    for(var i=0,leng = els.length;i<leng;i++){
        var k = els[i].className.split(' ');
        for(j = 0,len = k.length;j<len;j++){
            if(k[j] == str){
                arr.push(els[i]);
                break;
            }
        }
    }
    return arr;
}
GLOBAL.Dom.addClass = function(node,str){
    var reg = new RegExp("(^|\\s+)"+str);
    if(!reg.test(node.className)){
        node.className = node.className+" "+str;
    }
}
GLOBAL.Dom.removeClass = function(node,str){
    var reg = new RegExp("(^|\\s+)"+str);
    if(reg.test(node.className)){
        node.className = node.className.replace(reg,"");
    }
}
function setTab(root,currentClass){
    //取得标签及内容的节点，并以数组的形式保存在变量中
    var tabMenus = GLOBAL.Dom.getElementsByClassName('tab_list',root),
        tabContents = GLOBAL.Dom.getElementsByClassName('tab_con',root);
    //遍历数组，让标签监听click事件
    for(var i=0,leng = tabMenus.length;i<leng;i++){
        tabMenus[i]._index = i;
        tabMenus[i].onclick = function(){
            for(var j=0,len = tabContents.length;j<len;j++){
                tabContents[j].style.display="none";
            }
            tabContents[this._index].style.display = "block";
            var currentMenu = GLOBAL.Dom.getElementsByClassName(currentClass,root)[0];
            if(currentMenu){
                GLOBAL.Dom.removeClass(currentMenu,currentClass);
            }
            GLOBAL.Dom.addClass(this,currentClass);
        }
    }
}

/*注册修改密码验证*/
var $loadingToast = $('#iosDialog2');
$('#dialogs').on('click', '.weui-dialog__btn', function(){
    $(this).parents('.js_dialog').fadeOut(200);
});
function  test() {
    var login_name=$("input[name=login_tel]").val();
    var login_verification=$("input[name=login_verification]").val();
    var login_pwd=$("input[name=login_pwd]").val();
    var login_pwd_one=$("input[name=login_pwd_one]").val();
    if(login_name=="") {
        $loadingToast.fadeIn(200);
        $loadingToast.find(".weui-dialog__bd").text("请填写用户名");
        return false;
    }
    if(login_verification==""){
        $loadingToast.fadeIn(200);
        $loadingToast.find(".weui-dialog__bd").text("请填写验证码");
        return false;
    }
    var pwdReg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    if (!pwdReg.test(login_pwd)) {
        $loadingToast.fadeIn(200);
        $loadingToast.find(".weui-dialog__bd").text("请输入6位字母或数字组成密码");
        return false;
    }
    if(login_pwd=="") {
        $loadingToast.fadeIn(200);
        $loadingToast.find(".weui-dialog__bd").text("请填写密码");
        return false;
    }
    if(login_pwd_one=="") {
        $loadingToast.fadeIn(200);
        $loadingToast.find(".weui-dialog__bd").text("请填写确认密码");
        return false;
    }
    if(login_pwd!=login_pwd_one){
        $loadingToast.fadeIn(200);
        $loadingToast.find(".weui-dialog__bd").text("两次密码不一致");
        return false;
    }
    return true;
}
/*获取验证码*/
var off=true;
var  i=60;
function  yzm() {
    var login_name=$("input[name=login_tel]").val();
    if(off){
        var telRge=checkMobile(login_name);
        if(!telRge){
            return false;
        }
        $("#yzs").text(i+"s");
        code();
    }
}
function code() {  //倒计时
    var setin = setInterval(function () {
        if (i > 0) {
            off=false;
            --i;
            $("#yzs").text( i + "s");
        } else {
            clearInterval(setin);
            $("#yzs").text("重新获取");
            off = true;
            i = 60;
        }
    }, 1000)
}
function  checkMobile(tel) {
    var reg = /^1[3,7,8,5,4][0-9]{9}$/;
    if (!reg.test(tel)) {
        $loadingToast.fadeIn(200);
        $loadingToast.find(".weui-dialog__bd").text("请输入正常手机号码");
        return false;
    }
    return true;
}
