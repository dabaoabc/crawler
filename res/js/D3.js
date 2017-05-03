$(function() {
    var fill = d3.scale.category20();



    var $selected = $('#js-selected');

    $selected.on('change', function() {
        var category = $(this).find('option').eq(this.selectedIndex).val();
        sendword(category);
    });
    
    function sendword(data){
      $.ajax({
        url: '/analysis/word',
        type: 'post',
        data: {
          category: data
        },
        success: function(json){
          var list = json.list;
          // console.log(list);

          d3.layout.cloud().size([300, 300])
          //map 返回新的object数组
          .words(list.map(function(d) {
              return { "text": d, "size": 10 + Math.random() * 50 };
          }))
          //~~的作用是单纯的去掉小数部分，不论正负都不会改变整数部分 
          //这里的作用是产生0 1 
          .rotate(function() {
              return ~~(Math.random() * 2) * 90; })
          .font("Impact")
          .fontSize(function(d) {
              return d.size; })
          .on("end", draw) //结束时运行draw函数
          .start();
        }
      })
    }
    function draw(words) {
        $('.font_cloud').text(" ");
        d3.select(".font_cloud").append("svg")
            .attr("width", "100%")
            .attr("height", 300)
            .attr("style", "border:1px solid #3bb4f2")
            .append("g")
            .attr("transform", "translate(450,150)")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("border", "1px solid blue")
            .style("font-size", function(d) {
                return d.size + "px"; })
            .style("font-family", "Impact")
            .style("fill", function(d, i) {
                return fill(i); }) //fill 在前面15行定义为颜色集
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) {
                return d.text; });
    }
})
