/*
	date: 20141006 17:55
	author: daming
*/


$("#loginBtn").on('click', function (){
	var username=$("#inputUserName").val();
	if($("#rememberUser").is(":checked")){
		localStorage.rememberUser=true;
		localStorage.userName=username;
	}
});

function prompt (text, className) {
	return '<div class="prompt '+ className +'">'+ text +'</div>';
}

$("#name").on('focus', function () {
	var  that = $(this)
		,proText =prompt('4-20位字符，包括中文、英文、数字');

	that.next().remove();
	that.after(proText);
	
	that.removeClass('error');
}).on('blur', function () {
	var  that = $(this)
		,value = that.val()
		,reg = /^[\w\u4e00-\u9fa5]{4,20}$/;

	if(!reg.test(value)){
		that.next().text('用户名只能是4-20位的中文、英文、数字').addClass('error');
		that.addClass('error');
	} else {
		//验证是否存在
	}
})

$("#main-nav li a.nav-top-item").click(
			function () {
			    $(this).next().slideToggle("slow").parent().siblings().find("ul").slideUp("slow");
			    return false;
			}
		); 

$("#main-nav li a.nav-item").click( // When a top menu item is clicked...
	function () {
	    $(this).parent().siblings().find("ul").slideUp("slow"); // Slide up all sub menus except the one clicked
	    $(this).next().slideToggle("slow"); // Slide down the clicked sub menu
	    return false;
	}
);