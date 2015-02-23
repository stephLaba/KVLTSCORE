
		var metal = {};

		metal.apiKey = "PWJEF8DOKLGWYRDMH";

  		metal.init = function(){
  			
  		}

  	

	
	// user submits metal genre from drop down
	$(".search").on("submit", function(e){
		e.preventDefault();
		var userChoice = $(".metalGenre").val();
		var countryLocation = $(".artistLoc").val();
		// console.log(userChoice, countryLocation);
		// we finally call the getGenre method, which will perform the ajax request
		// $(".artistLoc").val(" ");
		metal.getGenre(userChoice, countryLocation);
		smoothScroll.animateScroll(
		   null,"#cont"
		    // options // Classes and callbacks. Same options as those passed into the init() function.
		);

	 
	});

	

	// $(".clear").on("click",function(e){
	// 	e.preventDefault();
	// 	console.log("item cleared? ")
	// 	$(".container").fadeOut();
	// });

	// here we define the method - it expects two args: genre, location
	metal.getGenre = function(userChoice, countryLocation){
		$.ajax({
		url:"http://developer.echonest.com/api/v4/artist/search",
		type:"GET",
		dataType: "jsonp",
		data: {
			api_key:metal.apiKey,
			artist_location:'country:' + countryLocation,
			results:100,
			format: 'jsonp', 
			genre: userChoice
			
		},
		success: function(data){
			console.log("it works");
			console.log(data);
			metal.displayGenre(data, countryLocation);
			// console.log(data.response);
			var totalNumOfBands = data.response.artists.length;
			console.log("There are this many metal bands:" + data.response.artists.length)
		}

	});
	}


		metal.displayGenre = function(data, countryLocation){
				$("#bands").html(" ");
				// var result = data.response.artists[i];
				
				// this is everything!!
				var everything = data.response.artists;

				// this is the top 3
				var location = countryLocation 
				var result = everything.slice(0,3);
				var h4Top = "<img class='flash kvltImg flashing' src='i/sulfur.png' alt=''><h4>Top Bands for " + countryLocation + "</h4> <hr>";
				console.log(location + "yoyoyoyo");
				// data.response.artists[i].name
				// data.response.artists[i].id
				$(".container").html(h4Top);
				for (var i = 0; i < result.length; i++){
					// console.log("holy toledo!");
					// console.log(result[i].name);
					// console.log(result[i]).id);
					var div = $("<div>").addClass("bandlist").text(result[i].name); 
					// var top3 =  result.slice(0,2);
					$(".container").append(div).addClass("showNone");
				}
				metal.kvltScore(everything); 
				// end for loop

		}
		// end metal.displayGenre

			metal.kvltScore = function(param){
				// var everything = data.response.artists;
				if(param.length <= 0){
					var noDiv = $("<div>").html("<p>The bands of this country are too kvlt to be part of this site</p>");
					$(".container").append(noDiv);
				}else if(param.length >= 20){
					var trueKDiv = $("<div>").html("<h3>KVLT RATING:</h3><hr>  <span>TRUE KVLT</span> <p>There is a high concentration of metal bands in this country</p>");
					$(".container").append(trueKDiv);
					// console.log("this works!!!!")
			}else if(param.length >= 40){
				var brutalDiv = $("<div>").html("<h3>KVLT RATING:</h3> <hr> <span>SO KVLT</span><p>There is a mid-high concentration of metal bands in this country</p>");
				$(".container").append(brutalDiv);
			}else if(param.length <40){
				var brutalDiv = $("<div>").html("<h3>KVLT RATING:</h3> <hr> <span>BRÜTAL</span><p>There is a medium concentration of metal bands in this country</p>");
				$(".container").append(brutalDiv);
			}
			$(".container").fadeIn();
		}


	

	$(function() {
		smoothScroll.init();
	});
