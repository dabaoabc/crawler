module.exports = function(segmentword, list){
	var segmentobj = {};
	var count = 1;
	var segprobability = [];
	list.forEach(function(e){
		segmentobj[e.hot_word] = e.segmentword;
		segprobability.push(probability(e.hot_word, segmentword));
	});
	var index = segprobability.indexOf(Math.max.apply(Math, segprobability))
	
	return list[index].hot_word;


	
	function probability(category, segmentword){
		segmentword.forEach(function(e){
			if (segmentobj[category] == 0) {
				count = 0;
			}else{
				count *= numAtArrayCount(segmentobj[category], e)/segmentobj[category].length;
			}
			
		});
		return count;
	};
	// 统计词汇在数组出现的个数
	function numAtArrayCount(arr, num) {
	    arr.sort();
	    if (arr.lastIndexOf(num) == -1 || arr.indexOf(num) == -1) {
	    	return 0;
	    }
	    return arr.lastIndexOf(num) - arr.indexOf(num) + 1;
	}
}