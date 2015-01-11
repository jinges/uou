var getCustomer = function (argument) {
	$.get('../api/selCustomers',
		 argument,
		function (data) {
			console.log(data);
		}
	)
}

getCustomer();
var pageIndex = 0;
$("body").on('click','.pagination li', function () {
	var that = $(this),
		index = that.index(),
		len = that.siblings().length + 1;

	pageIndex = index ;


	if (index == 0 && pageIndex > 1) {
		pageIndex --;
		that.siblings().removeClass('disabled');
	}
	else if (index == len - 1 && pageIndex < len -2) {
		pageIndex ++;
		that.siblings().removeClass('disabled');
	}
	else if(index == 1){
		pageIndex = 0;
		that.addClass("active").siblings().removeClass('active');
		that.prev().addClass('disabled').siblings().removeClass('disabled');
	} else if (index == len - 2) {
		pageIndex = len - 2;
		that.addClass("active").siblings().removeClass('active');
		that.next().addClass('disabled').siblings().removeClass('disabled');
	}
	// if(that.index()==that.siblings().length){
	// 	that.next().addClass('disabled');
	// } else {
	// 	that.index();
	// }
	// that.addClass("active").siblings().removeClass('active');
})