var getCustomer = function (argument, callback) {
	$.get('../api/selCustomers',
		 argument,
		function (data) {
			callback(data);
		}
	)
}

var data;
var maxPage=0;
var currentPage = 1;
var currentIndex = 1;

getCustomer({'mid': '54b0e8bb215626600f0a5d5f'}, function (obj) {
	if(obj.length<1){
		alert('暂无数据');
		return false;
	}
	data =obj;
	maxPage = Math.ceil( data.length / 10);
	setTable();
	setPagination(10);
});

function setPagination (count) {
	var strItem = '<li><a>&laquo;</a></li>';
	var i = count > 0 ? currentPage: currentPage + count;
	var len = count > 0 ? currentPage + count : currentPage+1;
	for(i;i< len; i++){
		if(i > maxPage){
			break;
		}
		if(i == currentPage){
			strItem += '<li class="active"><a>'+ i +'</a></li>';
			continue;
		}
		strItem += '<li><a>'+ i +'</a></li>';
	} 
	strItem +='<li><a>&raquo;</a></li>';
	$('.pagination').html(strItem);
	currentIndex = 1;
}

function setTable(){
	var strItem = '',
		count=currentPage*10;
	for(var index = 10 * (currentPage-1);index< count;index++){
		var item = data[index];
		var date = new Date(item.regDate);
		strItem +='<tr data-index="'+ index +'" data-id="'+ item._id +'">'+
				   '<td><input type="checkbox"></td>'+
		           '<td>'+ item.userName +'</td>'+
		           '<td>'+ item.name +'</td>'+
		           '<td>'+ (item.gender?'男':'女') +'</td>'+
		           '<td>'+ item.birthDay +'</td>'+
		           '<td>'+ item.score +'</td>'+
		           '<td>'+ item.lock +'</td>'+
		           '<td>'+ date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate() +'</td>'+
		           '<td><span class="glyphicon glyphicon-trash remove-customer" title="删除"></span></td>'+
		        '</tr>';
	}
	$("tbody").html(strItem);
}

$("body").on('click','.pagination li', function () {
	var that = $(this),
		index = that.index(),
		len = that.siblings().length + 1;
	
	that.siblings().removeClass('disabled').removeClass('active');
	if(index == 0 && currentPage > 1) {
		currentPage --;
		currentIndex --;
	} else if (index == len - 1 && currentPage < maxPage) {
		currentPage ++;
		currentIndex ++;
	} else if(index > 0 && index < len - 1){
		currentPage = that.text() * 1;
		currentIndex = index;
	} 

	setTable();
	if(currentPage > 1){
		if(currentIndex == 0){
			setPagination(-9);
			currentIndex = 10;
		} else if(currentPage < maxPage && currentPage % 10 ==1){
			setPagination(10);
		}
	}

	if(currentIndex == 1 && currentPage == 1){
		that.parent().children().eq(0).addClass("disabled");
	} else if(currentPage == maxPage){
		that.parent().children().eq(len - 1).addClass("disabled");
	}
	that.parent().children().eq(currentIndex).addClass('active');
})

// $("body").on('click', '.remove-customer', function () {
// 	var tr = $(this).parent().parent(),
// 		id = tr.attr('data-id'),
// 		index = tr.attr('data-index');

// 	$.get('../api/delCustomer',{'_id': id}, function (result) {
// 		if(!result.status){
// 			alert('系统错误:'+ result.error);
// 			return false;
// 		}
// 		if(tr.siblings().length > 1){
// 			tr.remove();
// 			data.splice(index,1);
// 		} else{
// 			setTable();
// 		}
// 	})
// })