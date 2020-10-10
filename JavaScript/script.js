$(document).ready(function(){

	var movieArr = JSON.parse(movies);

	//Display initial movies
	for (let i =0; i<movieArr.length; i++){
		$('#movieDisplay').append(`
			<div class="col-12 col-lg-6 movieBox">
					<div>
						<img src="${movieArr[i].image}">
					</div>
					<div class= "contentDiv">
						<div>
							<div class= "movieTitle">
								${movieArr[i].movieName}
							</div>
							<div class = "movieDescription">
								${movieArr[i].description}
							</div>
						</div>
						<div class= "likeDiv">
							<span id="btn${i}" class = "greenDiv">
								Like &#x1F44D
							</span>
							<span id = "circleDiv${i}" class= "circleDiv">
									${movieArr[i].likes}
							</span>
						</div>
					</div>
				</div>
			`);
		//Code for like button
		$("#btn"+i).on("click", function(){
			$("#btn"+i).css("border-color", "green");
			movieArr[i].likes += 1;
			//$(`circleDiv${String(i)}`).html(movieArr[i].likes);
			document.getElementById(`circleDiv${String(i)}`).innerHTML= movieArr[i].likes;
		});
	}


	//Sort by alphabetical
	$("#alph").on("click", function(){

		//Here I sort it alphabetically in alphArr
		var tempArr =[];
		var alphArr = [];
		for(let i=0; i<movieArr.length; i++){
			tempArr[i]= movieArr[i].movieName;
		}

		//I learned to use .sort() on just a string Array
		tempArr.sort();
		for(let i=0; i<movieArr.length; i++){
			for (let z = 0; z<movieArr.length; z++){
				if(tempArr[i]==movieArr[z].movieName){
					alphArr[i]=movieArr[z];
				}
			}
		}

		//Here I change movieDisplay to new order
		$('#movieDisplay').html("");
		for (let i =0; i<movieArr.length; i++){
		$('#movieDisplay').append(`
			<div class="col-12 col-lg-6 movieBox">
					<div>
						<img src="${alphArr[i].image}">
					</div>
					<div class= "contentDiv">
						<div>
							<div class= "movieTitle">
								${alphArr[i].movieName}
							</div>
							<div class = "movieDescription">
								${alphArr[i].description}
							</div>
						</div>
						<div class= "likeDiv">
							<span id="btn${i}" class = "greenDiv">
								Like &#x1F44D
							</span>
							<span id = "circleDiv${i}" class= "circleDiv">
									${alphArr[i].likes}
							</span>
						</div>
					</div>
				</div>
			`);
		if(alphArr[i].likes > 0){
		$("#btn"+i).css("border-color", "green");
		}
		$("#btn"+i).on("click", function(){
			$("#btn"+i).css("border-color", "green");
			alphArr[i].likes += 1;
			movieArr[i].likes = alphArr[i].likes;
			//$(`circleDiv${String(i)}`).html(movieArr[i].likes);
			document.getElementById(`circleDiv${String(i)}`).innerHTML= alphArr[i].likes;
		});
	}
			});

	//Sort by number of likes
	$("#mostLiked").on("click", function(){

		//Here I make array temp filled with like values
		var likedArr = movieArr;
		var temp = [];
		for(let i =0; i<movieArr.length; i++){
			temp[i]= movieArr[i].likes;
		}

		
		//Here i sort temp from lowest to greatest
		//I can change set the values of likedArr at the same time
		for (let i = 0; i<movieArr.length; i++){
			for(let j = i+1; j<movieArr.length; j++)
				if(temp[i]>temp[j] && i!=j){
					var y = temp[j];
                    temp[j] = temp[i];
                    temp[i] = y;

                    var x = likedArr[j]
                    likedArr[j] = likedArr[i];
                    likedArr[i] = x;
				}
		}
		
		//I reverse order
		likedArr.reverse();

		//Redisplay with new information from likedArr
		$('#movieDisplay').html("");
		for (let i =0; i<movieArr.length; i++){
		$('#movieDisplay').append(`
			<div class="col-12 col-lg-6 movieBox">
					<div>
						<img src="${likedArr[i].image}">
					</div>
					<div class= "contentDiv">
						<div>
							<div class= "movieTitle">
								${likedArr[i].movieName}
							</div>
							<div class = "movieDescription">
								${likedArr[i].description}
							</div>
						</div>
						<div class= "likeDiv">
							<span id="btn${i}" class = "greenDiv">
								Like &#x1F44D
							</span>
							<span id = "circleDiv${i}" class= "circleDiv">
									${likedArr[i].likes}
							</span>
						</div>
					</div>
				</div>
			`);
		if(likedArr[i].likes > 0){
		$("#btn"+i).css("border-color", "green");
		}
		$("#btn"+i).on("click", function(){
			$("#btn"+i).css("border-color", "green");
			likedArr[i].likes += 1;

			//Here I make sure to always update the value of likes in movieArr
			movieArr[i].likes = likedArr[i].likes;
			//$(`circleDiv${String(i)}`).html(movieArr[i].likes);
			document.getElementById(`circleDiv${String(i)}`).innerHTML= likedArr[i].likes;
		});
	}
	
	});
});