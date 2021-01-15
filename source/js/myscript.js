const url = "https://api.jsonbin.io/b/5ff7e18809f7c73f1b6f05e3/2";

var resultCar = [];
$(function () {
	fetch(url, {
		method: "GET",
		headers: {
			"secret-key": "$2b$10$XnRQ8lXD0phXmFoYQp5.VOBeiO3TmKBs8hfmZ2Uw04Ju3rpP/Bi6i",
		}
	})
		.then(resp => resp.json())
		.then(function (data) {
			console.log(data);
			resultCar = data;
		paginationRendering(data);
		})
		.catch(function (error) {
			console.log(error);
		});
})

function paginationRendering(resultCar){


	var container = $('#page')
	$('#page').pagination({
		dataSource: resultCar,
		totalNumber: 31,
		pageSize: 6,
		showPageNumbers: true,
		className: 'paginationjs-theme-blue paginationjs-big',
		showNavigator: true,
		callback: function (response, pagination) {
			console.log(response, pagination)
			window.console && console.log(22, response, pagination);
			var dataHtml = '';

			$.each(response, function (index, item) {
				//	dataHtml += '';
			});

			dataHtml += '';

			container.prev().html(dataHtml);
			response.forEach(hairstyle => buildHairstyleCard(hairstyle));
		}
	})
}

var parent = document.getElementById('parent');

const buildHairstyleCard = hairstyle => {
	// Create elements needed to build a card
	const div = document.createElement("div");
	const h4 = document.createElement("h4");
	const img = document.createElement("img");
	const para = document.createElement("p");
	const span = document.createElement("span");
	parent.append(div);
	div.append(h4);
	div.append(img);
	div.append(span);
	div.append(para);
	div.classList.add("card");
	// Set content and attributes
	h4.innerHTML = " " + hairstyle.Year + " " + capitalizeTheFirstLetterOfEachWord(hairstyle.Name);
	img.classList.add("card-img");
	img.setAttribute("src", hairstyle.Image);
	para.classList.add("paraSpace");
	span.classList.add("spanClass");
	
	para.innerHTML = capitalizeTheFirstLetterOfEachWord(hairstyle.Category) + " | " + capitalizeTheFirstLetterOfEachWord(hairstyle.Gearbox_type) + " | " + hairstyle.Capacity + " Passengers " + " | " + hairstyle.Fuel_type
	span.innerHTML = "$"+hairstyle.Rate;
};

function capitalizeTheFirstLetterOfEachWord(words) {
	var separateWord = words.toLowerCase().split(' ');
	for (var i = 0; i < separateWord.length; i++) {
		separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
	}
	return separateWord.join(' ');
}


function filterData(data) {
	var slider = document.getElementById("myRange");
var sliderValue = slider.value;
  var tgSelect = document.getElementById("Type");
  tgSelect = tgSelect.options[tgSelect.selectedIndex].value;
  var engSelect = document.getElementById("Fuel");
  engSelect = engSelect.options[engSelect.selectedIndex].value;
  var filteredData = data.filter((e) => { 
    return  (!sliderValue || (e.Rate>=50 && e.Rate<=sliderValue))&& (!tgSelect || e.Gearbox_type === tgSelect) && (!engSelect || e.Fuel_type === engSelect);
  });
	console.log(filteredData);
	paginationRendering(filteredData);
}

document.getElementById("filterBtn").addEventListener("click", e => {
  filterData(resultCar);
});




var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = "$" +slider.value;

slider.oninput = function() {
  output.innerHTML = "$"+this.value;
}


function sortingHorsePower_Year(){
	
		var x = document.getElementById("optionYear").value;
		if(x === "HorsePower"){
		
			resultCar.sort(function(a,b){
				return a.HorsePower - b.HorsePower;
			})
			paginationRendering(resultCar);
		}
		else if(x === "Year"){
			resultCar.sort(function(a,b){
			return	a.Year - b.Year;
			})
			paginationRendering(resultCar);
		}
	
}

