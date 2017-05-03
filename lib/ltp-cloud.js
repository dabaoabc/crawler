var nodejieba = require("nodejieba");
// var article = require('../model/article.js');
// var resultArray;
// var analysis = [];
// article.find({}, function(err, result) {
//     if (result) {
//         result.forEach(function(e) {
//         	if (e.category !== 'none') {
//         		var string = e.content;
//         		resultArray  = nodejieba.tag(string);
//         		resultArray.forEach(function(e){
//         			if (e.tag == 'n') {
//         				analysis.push(e);
//         			}
//         		});
//         	}
//         })
//     }

//     console.log(analysis);

// })
var Bayes = {};
Bayes.train = function (text, label) {  
    registerLabel(label);
    var words = nodejieba.extract(text, 10);;
    var length = words.length;
    for (var i = 0; i < length; i++)
        incrementStem(words[i], label);
    incrementDocCount(label);
};

// var string = "本报讯　　记者殷雷报道 昨日，“太阳山杯”2016第二届抚仙湖国际高原帆船赛正式开赛，众多国内外选手展开同场竞技，角逐专业组和非专业组两个冠军。　　“和海洋帆船赛相比，参加抚仙湖的帆船赛更多是一种享受，只需要考虑风向而不用考虑洋流的影响。”专程从大连赶回来参赛的李庆玉是地地道道的澄江人，从大连海事大学毕业后就从事帆船方面工作的他，听说家乡要举办帆船赛，不仅自己来了，还带了4名队友一同前来参赛。　　除李庆玉这样有家乡情结的人来参赛外，此次比赛还吸引了游牧虎Sailing In、厦门城市学院帆船队、青岛帆协帆友会等国内知名赛队参加。连续第2年参赛的邓皓予告诉记者，和首届帆船赛相比，本届帆船赛不仅参与度更为广泛，整体实力也明显更胜一筹。　　本届赛事由中国帆船帆板运动协会、云南省体育局、玉溪市政府主办，澄江县政府、厦门顽石航海俱乐部、云南报业文化投资发展有限公司等单位共同承办。参赛队伍将分为专业组和业余组，两组的冠军队伍将分别获得价值15000元和10000元的奖励。　　“在高原内陆湖泊举办帆船赛事具有沿海地区无法比拟的优势，我们将在吸引更多知名赛队参赛的基础上，大力引导和扶持本土赛队参与，以提升赛事的知名度和参与度。”组委会相关负责人表示。media_span_url('http://daily.clzg.cn/html/2016-04/03/content_557656.htm')来源昆明日报)"
// var result = nodejieba.extract(text, 20);
// console.log(result);