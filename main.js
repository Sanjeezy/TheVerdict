//Driver File
//Last Updated: Feb 22, 2018

$(document).ready(function() {
	var data;
	isLoading();
	data = $.getJSON("https://api.myjson.com/bins/e2si9");
	console.log(data);
	data.complete(setTimeout(function() {
		data = data.responseJSON.items;
		populate(data);
		$(".loading").css("display", "none")
	}, 1000));
	isLoading();
});

function populate(cards) {
	var i;
	for (var i = 0; i < cards.length; i++) {
		//create_card(cards[i]);
		create_outerCard(cards[i]);
	}
}

function create_outerCard(card) {
	var outerStr = '<div class="outerCard" id="'+card.appName+'">';
	var cardStr='';
	cardStr = create_card(card);
	outerStr += cardStr;
	outerStr += '</div>';
	$("#overallWrapper").append(outerStr);
	create_modal(card);
}

function create_card(card) {
	var cardStr = '<div class="card">';
	var titleStr = create_title(card);
	cardStr += titleStr;
	var categoryStr = '';
	if (card.category) {
		categoryStr = create_category(card);
	}
	cardStr += categoryStr;
	if (card.imgURL) {
		var imageStr = create_image(card);
		cardStr += imageStr;
	}
	if (card.upvoteCount) {
		var upvoteStr = create_upvoteCount(card);
		cardStr += upvoteStr;
	}
	if (card.appDescription) {
		var descStr = create_desc(card);
		cardStr += descStr;
	}  
	cardStr += '</div>'
	return cardStr;
	// $("#overallWrapper").append(cardStr);
	// create_modal(card);
	console.log("printed");  //six times printed
}

function create_title(card) {

	var result = '<div class="title">' + card.appName + '</div>';
	return result;
}

function create_image(card) {
	var appendStr = "";
	var picture = card.imgURL;
	var appendStr = '<div class="image">' 
	+ '<img src="' + picture + '">'
	+ '</div>';
	return appendStr;
}

function create_category(card) {
	var str = '<div class="category">' + card.category + '</div>';
	return str;
}

function create_upvoteCount(card) {
	var str = '<div class="upvoteCount">' + card.upvoteCount + '</div>';
	return str;
}

function create_desc(card) {
	var str = '<div class="desc">' + card.appDescription + '</div>';
	return str;
}

function create_modal(card) {
	var flag=0;
	var mainId = card.appName;
	var mainDiv = document.getElementById(mainId);

	//create elements 
	var modal = document.createElement("div");
	var modalContent = document.createElement("div");
	modal.className = "modal";
	modalContent.className = "modal-content";

	//create app icon inside modal
	var appIcon = document.createElement('div');
	appIcon.className = "modal_appIcon";
	if (card.imgURL) {
		var img = document.createElement('img');
		img.src=card.imgURL;
		appIcon.appendChild(img);
	}

	//create app title in modal
	var appTitle = document.createElement("h3");
	appTitle.innerHTML = card.appName;

	//create divider line
	var appLineDivider = document.createElement("hr");
	appLineDivider.className = "modal_appLineDivider";

	//create app review in modal 
	var appReview = document.createElement("div");
	var text = document.createElement("p");
	if (card.appReview) {
		text.innerHTML = card.appReview;
		appReview.appendChild(text);
	}

	//the close button inside modal
	var closeModal = document.createElement("span");
	closeModal.className = "close";
	closeModal.innerHTML = "&times;";

	//now append everything
	modalContent.appendChild(appIcon);
	modalContent.appendChild(appTitle);
	modalContent.appendChild(appLineDivider);
	modalContent.appendChild(appReview);
	modalContent.appendChild(closeModal);
	modal.appendChild(modalContent);
	mainDiv.appendChild(modal);


	//setup onclick handlers
	mainDiv.firstChild.onclick = function() {
		if (flag === 0) {
			//0 means we have not clicked on div
			modal.style.display="block";
			flag = 1;
		}
	}
	closeModal.onclick = function() {
		if (flag === 1) {
			//1 means that modal is open
			modal.setAttribute("style","display: none !important");
			flag = 0;
		}
	}

	//event listener for clicking out.
	modal.addEventListener('click', function(event) {
		var isInside = modalContent.contains(event.target);
		if (!isInside) {
			modal.setAttribute("style","display: none !important");
			flag = 0;
		}
	});
}

function isLoading() {
	var animationName = 'animated rubberBand';
	//one listens for event once and then unbinds itself
	$(".loading").addClass(animationName).one('webkitAnimationEnd animationend', function() {
		$(this).removeClass(animationName);
	});
}








