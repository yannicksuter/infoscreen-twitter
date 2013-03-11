function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes[0].nodeValue;
}

function initialize() {  
	$.getJSON("http://search.twitter.com/search.json?rpp=10r&q=localch&callback=?", function(tweets){
		var one_minute=1000*60;
		var one_hour=1000*60*60;
		var one_day=1000*60*60*24;
		var one_year=1000*60*60*24*365;
		var nowDate = new Date();
		
	    for(i in tweets.results) {
	        html = "<div id=\"feed\">\n";
			html += "<div class=\"avatar\"><img alt=" + tweets.results[i].from_user + " src=" + tweets.results[i].profile_image_url + " /></div>\n";
			html += "<div class=\"msg\"><b>" + tweets.results[i].from_user + "</b>: " + tweets.results[i].text + "</div>\n";
			html += "<div class=\"info\">about ";
			
			var diff = nowDate.getTime() - (new Date(tweets.results[i].created_at));
			var y = Math.floor(diff/(one_year));
			if (y > 0) {
				if (y>1)
					html += y + " years ";
				else 
					html += "1 year ";
			} else {
				var d = Math.floor(diff/(one_day));
				if (d > 0) {
					if (d>1)
						html += d + " days ";
					else 
						html += "1 day ";
				} else {
					var h = Math.floor(diff/(one_hour));
					if (h > 0) {
						if (h>1)
							html += h + " hours ";
						else 
							html += "1 hour ";
					} else {
						var m = Math.floor(diff/(one_minute));
						if (m > 0) {
							if (m>1)
								html += m + " minutes ";
							else 
								html += "1 minute ";
						}
					}
				}
			}
            html += "ago <span class=\"source\">via " + htmlDecode(tweets.results[i].source) + "</span></div>\n";
            // html += "<div id=\"arrow-left\"><img src=\"images/arrow2.png\" width=\"11\" height=\"14\" alt=\"Arrow\"></div>";
            html += "</div>";

	        $("#subpage").append(html);
	    }
	});
}
