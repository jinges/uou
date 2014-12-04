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
})
