var addEvent = {};
addEvent.add = function() {
	var user_name = $('[name="user_name"]').val();
	var email = $('[name="email"]').val();
	var phone = $('[name="phone"]').val();
	var password = $('[name="password"]').val();
	var qq = $('[name="qq"]').val();
	$.ajax({
		url: '/user_manage',
		type: 'post',
		data: {
			user_name: user_name,
			email: email,
			phone: phone,
			password: password,
			qq: qq,
		},
		success: function(json){
			dialog({
				title: '操作提示',
		        content: json.info,
		        okValue: '确定',
		        textAlign: "center",
		        lock: true,
		        ok: function () {}
			}).showModal();

			if (json.status) {
				addEvent.append(json.data);
			}
		}
	});
};
addEvent.append = function(data){
	$(".am-table tbody").append("<tr class='am-animation-slide-right'>"+
                "<td>"+data.user_name+"</td>"+
                "<td>"+data.email+"</td>"+
                "<td>"+data.phone+"</td>"+
                "<td>"+data.password+"</td>"+
                "<td>"+data.qq+"</td>"+
                "<td><a href='javascript:void(0)' class='remove_user'>删除</a></td>"+
            "</tr>");
}
addEvent.remove = function(){
	var that = this;
	var element = $(this).parent("td").siblings('.emailelem').text();
	$.ajax({
		url: '/user_manage/delete',
		type: 'post',
		data: {
			email: element
		},
		success: function(json){
			dialog({
				title: '操作提示',
		        content: json.info,
		        okValue: '确定',
		        textAlign: "center",
		        lock: true,
		        ok: function () {}
			}).showModal();

			if (json.status) {
				$(that).parents("tr").detach();
			}
		}
	});
}

$(function(){
	$(".add-user").on("click", function(e){
		e.preventDefault();
		addEvent.add.apply(this);
	})
	$('.remove_user').on("click", function(e){
		addEvent.remove.apply(this);
	});
})