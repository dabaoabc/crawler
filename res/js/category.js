var addEvent = {};
addEvent.set = function() {
	var category = $('[name="doc-radio"]:checked').val();
	var id = $(".article").data("id");
	console.log("id",id);
	$.ajax({
		url: '/news/category',
		type: 'post',
		data: {
			category: category,
			_id: id
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

			// if (json.status) {
			// 	addEvent.append(json.data);
			// 	$('[name="hot_word"]').val(" ");
			// }
		}
	});
};
addEvent.append = function(data){
	$(".am-table tbody").append("<tr>"+
                "<td>"+data.hot_word+"</td>"+
            "</tr>");
}

$(function(){
	$(".category").on("click", function(e){
		e.preventDefault();
		addEvent.set.apply(this);
		// alert("1");
	})
})