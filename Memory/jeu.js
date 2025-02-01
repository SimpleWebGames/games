var cardArray = [];
var cardNameList = [];
var cardNameList2 = [];
var counter = 0;

var chosenCard1 = "";
var chosenCardName1 = "";
var chosenCard2 = "";
var chosenCardName2 = "";
var chosenCardCounter = 0;

/***Cette fonction est la plus importante. Elle va d'abord appeler "choseCards" qui va choisir des cartes. Ensuite elle va les mettre en désordre et enfin, elle va créer les éléments html pour afficher les cartes et les mettre dans le body***/
function loadGame() {
	choseCards("numberType");
	for(var z = 0; z < cardNameList.length; z++) {
		cardNameList2.push(cardNameList[z]);
		cardNameList2.push(cardNameList[z]);
	};
	shuffleArray(cardNameList2);
	console.log(cardNameList2);
	for(var i = 0; i < 4; i++) {
		var contentDiv = document.createElement('div');
		contentDiv.setAttribute("id", "cardRowELement"+i);
		contentDiv.setAttribute("class", "cardRow");
		document.body.appendChild(contentDiv); 
	};
	for(var k = 0; k < 4; k++) {
		for(var j = 0; j < 5; j++) {
			
			var containerDiv = document.createElement('div');
			containerDiv.setAttribute("class", "cardImg");
			containerDiv.setAttribute("id", "containerDiv" + k + "" + j);
			containerDiv.setAttribute("onclick", "compareCard("+cardNameList2[counter]+","+k+""+j+",event)");
			
			var backImg = document.createElement('img');
			backImg.setAttribute("id", "backImg" + k + "" + j);
			backImg.setAttribute("class", "cardImgBack");
			backImg.setAttribute("src", "./assets/back.png");
			
			var contentImg = document.createElement('img');
			contentImg.setAttribute("src", "./assets/" + cardNameList2[counter] + ".svg");
			contentImg.setAttribute("id", k + "" + j);
			contentImg.setAttribute("data-imgName", cardNameList2[counter]);
			cardArray.push(k + "" + j);
			contentImg.setAttribute("class", "cardImgFront");
			counter = counter + 1;
			
			document.getElementById("cardRowELement"+k).appendChild(containerDiv);
			document.getElementById("containerDiv"+k+""+j).appendChild(backImg);
			document.getElementById("containerDiv"+k+""+j).appendChild(contentImg);
		};
	};
};
/***Cette fonction choisit des cartes dans la liste des cartes et en choisit 10. Ensuite, elle les double.***/
function choseCards(type) {
	for(var i = 0; i < 10; i++) {
		var cardNumber = Math.floor(Math.random() * 13);
		var cardType = Math.floor(Math.random() * 4);
		if(type == "numberType") {
			if(cardNameList.includes(cardNumber + "" + cardType)) {
				var cardNumber2 = Math.floor(Math.random() * 13);
				var cardType2 = Math.floor(Math.random() * 4);
				cardNameList.push(cardNumber2 + "" + cardType2);
			} else {
				cardNameList.push(cardNumber + "" + cardType);
			}
		}
	};
	
};
/***Durstenfeld shuffle de Stack Overflow***/
/***Permet de mettre les cartes en désordre***/
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };
};
/***La fonction compare les cartes en stockant leur ID et leur nom. Ensuite on regarde si les IDs sont identiques. Si c'est le cas, alors on les supprime, si ce n'est pas le cas alors on les retourne***/
function compareCard(cardId, cardName, event) {
	if(chosenCardCounter == 0) {
		chosenCard1 = cardId;
		chosenCardName1 = cardName;
		element1 = event.currentTarget;
		element1.style.transform = "rotateY(180deg)";
		chosenCardCounter = chosenCardCounter + 1;
	} else if(chosenCardCounter == 1) {
		if (chosenCardName1 == cardName) {
			console.log("ARRÊTE !!!");
		} else {
			chosenCardCounter = 0;
			chosenCard2 = cardId;
			chosenCardName2 = cardName;
			element2 = event.currentTarget;
			element2.style.transform = "rotateY(180deg)";

			var overlay = document.createElement('div');
			overlay.setAttribute("class", "overlay");
			overlay.setAttribute("id", "overlay");
			document.getElementById('body').appendChild(overlay);

			if(chosenCard1 == chosenCard2) {
				setTimeout(function(){
					console.log("nice");
					document.getElementById("containerDiv"+('0'+chosenCardName1).slice(-2)).remove();
					document.getElementById("containerDiv"+('0'+chosenCardName2).slice(-2)).remove();
					document.getElementById('overlay').remove();
				}, 1000)
			} else {
				setTimeout(function(event){
					if (element1.style.transform == "rotateY(180deg)") {
						element1.style.transform = "rotateY(0deg)";
						element2.style.transform = "rotateY(0deg)";
						document.getElementById('overlay').remove();
					} else {
						element1.style.transform = "rotateY(180deg)";
						element2.style.transform = "rotateY(180deg)";
						document.getElementById('overlay').remove();
					}
				}, 3000)
			}
		}
	}
};
