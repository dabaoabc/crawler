var addEvent = {};
addEvent.add = function() {
	var hot_word = $('[name="hot_word"]').val();
	$.ajax({
		url: '/hot_word',
		type: 'post',
		data: {
			hot_word: hot_word
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
				$('[name="hot_word"]').val(" ");
			}
		}
	});
};
addEvent.append = function(data){
	$(".am-table tbody").append("<tr>"+
                "<td>"+data.hot_word+"</td>"+
                "<td><a href='javascript:void(0)' class='remove_user'>删除</a></td>"+
            "</tr>");
}
addEvent.remove = function(){
	var that = this;
	var element = $(this).parent("td").siblings('.list_word').text();
	$.ajax({
		url: '/hot_word/delete',
		type: 'post',
		data: {
			hot_word: element
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
	$('.remove_word').on("click", function(e){
		addEvent.remove.apply(this);
	});
})