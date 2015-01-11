var getCustomer = function (argument, callback) {
	$.get('../api/selCustomers',
		 argument,
		function (data) {
			callback(data);
		}
	)
}
var data;
var PageCount=0;
var pageIndex = 1;

getCustomer({'mid': '54b0e8bb215626600f0a5d5f'}, function (obj) {
	data =obj;
	PageCount = Math.ceil( data.length / 10);
	setPagination();
	setTable();
});

function setPagination () {
	var strItem = '';
	for(var i=0; i< PageCount; i++){
		strItem += '<li><a href="#">'+ (i+1) +'</a></li>';
	}
	$('#pageLeft').after(strItem);
}

function setTable(){
	var strItem = '',
		count=pageIndex*10;
	for(var index = 10 * (pageIndex-1);index< count;index++){
		var item = data[index];
		strItem +='<tr>'+
		           '<td>'+ item.name +'</td>'+
		           '<td>'+ item.userName +'</td>'+
		           '<td>'+ item.score +'</td>'+
		           '<td>@mdo</td>'+
		        '</tr>';
	}
	$("tbody").html(strItem);
}

$("body").on('click','.pagination li', function () {
	var that = $(this),
		index = that.index(),
		len = that.siblings().length + 1;

	if(index == 0 && pageIndex > 1) {
		pageIndex --;
		that.siblings().removeClass('disabled').removeClass('active').removeClass('disabled');
		that.parent().children().eq(pageIndex).addClass('active');
	} else if (index == len - 1 && pageIndex < len - 2) {
		pageIndex ++;
		that.siblings().removeClass('disabled').removeClass('active');
		that.parent().children().eq(pageIndex).addClass('active');
		that.siblings().removeClass('disabled');
	} else if(index > 0 && index < len - 1){
		pageIndex = index;
		that.siblings().removeClass('disabled');
		that.addClass("active").siblings().removeClass('active');
	} 

	if(pageIndex == 1){
		that.parent().children().eq(0).addClass("disabled").attr('disabled', 'disabled');
	} else if(pageIndex == len - 2){
		that.parent().children().eq(len - 1).addClass("disabled").attr('disabled', 'disabled');
	}
	setTable();
})