/*
	date: 20141006 17:55
	author: daming
*/

$(function (){
	$("#loginBtn").on('click', function (){
		var username=$("#inputUserName").val();
		if($("#rememberUser").is(":checked")){
			localStorage.rememberUser=true;
			localStorage.userName=username;
		}
	});

	(function (){
		if(localStorage.rememberUser){
			var username=localStorage.userName;
		}
	})();

	$(".text").on('focus', function (){
		$(this).removeClass('error').next().css('display','inline-block');
	}).on('blur', function () {
		$(this).next().removeAttr('style');
	})
})
