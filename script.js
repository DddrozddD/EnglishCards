const Go = document.getElementById("go");
const Main = document.getElementById("main")
const Plus = document.getElementById("plus");
const Minus = document.getElementById("minus");
const Count = document.getElementById("count");

var dopNum0 = Number(Count.textContent);

Plus.addEventListener('click', function() {
	dopNum0 = Number(Count.textContent);
	if((dopNum0 < 10)){
		dopNum0++;
	}
	else{
		dopNum0 = 1;
	}
	Count.textContent = `${dopNum0}`;
});

Minus.addEventListener('click', function() {
	dopNum0 = Number(Count.textContent);
	if((dopNum0 > 1)){
		dopNum0--;
	}
	else{
	dopNum0 = 10;		
	}
	Count.textContent = `${dopNum0}`;
});

Cards = [];
let xhr = new XMLHttpRequest();
xhr.responseType = 'json';


var DopCount1 = 0;
var DopCount2 = 0;
var resIsReady = false;
Go.addEventListener('click', function(){
	if(DopCount1 < dopNum0){
	main.innerHTML = "";
	xhr.timeout = 30000;
xhr.open('GET', 'https://raw.githubusercontent.com/ozadorozhnyi/words/main/words.json', true);
xhr.send();
	xhr.onload = function () {
      if (200 != xhr.status) {
          console.log(`Error`);
      } 
      else {
      	Cards.push({
      		ua: xhr.response[DopCount1].ua,
      		en: xhr.response[DopCount1].en,
      		IsTrue: false,
      		NotTrueAnsw: ""
      	});
      	ShowCardForStudy(document.getElementById("main"), xhr.response[DopCount1], DopCount1 + 1, dopNum0);
      	DopCount1++;
      }
}
Go.value = "Наступне";
}
else if(DopCount2 < dopNum0){
xhr.open('GET', 'https://raw.githubusercontent.com/ozadorozhnyi/words/main/words.json', true);
xhr.send();
	xhr.onload = function () {
      if (200 != xhr.status) {
          console.log(`Error`);
      } 
      else {
      	if(DopCount2 != 0){
      	const onUA = document.getElementById("onUA");
      	if(onUA.value.toUpperCase() === Cards[DopCount2 - 1].ua.toUpperCase()){
      		Cards[DopCount2 - 1].IsTrue = true;
      	}
      	else{
      		Cards[DopCount2 - 1].NotTrueAnsw = onUA.value;
      	}
      }
      	DopCount2++;
      	
      		main.innerHTML = "";
      	ShowCardForAnswer(document.getElementById("main"), xhr.response[DopCount2 - 1], DopCount2, dopNum0);

      	
      	
      }
}
}
else if((DopCount1 >= dopNum0)&&(DopCount2 >= dopNum0)&&(resIsReady == true)){
	Main.innerHTML="";
	Main.innerHTML+=`
	 <h1>Картки для вивчення англійських слів</h1>`;
		
		Go.textContent = "Поїхали";
		 DopCount1 = 0;
     DopCount2 = 0;
     dopNum0 = 10;
     resIsReady = false;
}
else{
	const onUA = document.getElementById("onUA");
   if(onUA.value.toUpperCase() === Cards[DopCount2 - 1].ua.toUpperCase()){
    	Cards[DopCount2 - 1].IsTrue = true;
   }
   else{
      		Cards[DopCount2 - 1].NotTrueAnsw = onUA.value;
      	}
   Main.textContent = "";
   var res = document.createElement('ul');
   var CountOfTrue = 0;
   Cards.forEach((card) =>{	
   	if(card.IsTrue == true) {
   		CountOfTrue++;
   	}
   });
   res.innerHTML += `<h1>Результат <span style="color:lightgreen;">${CountOfTrue}</span> з ${dopNum0}</h1>`
   Cards.forEach((card) =>{	
   	if(card.IsTrue == true){
   	res.innerHTML += `<li><span style="color:#DE31DE;">${card.ua}</span> - <span class="TrueAnsw">${card.en}</span></li>`;
   }
   else{
   	res.innerHTML += `<li><span style="color:#DE31DE;">${card.NotTrueAnsw}</span> - <span class="notTrueAnsw">${card.en}</span></li>`;
   }
   });
   Main.appendChild(res);
   Go.value = "Почати знову";
   resIsReady = true;
}
})



function ShowCardForStudy(parentElement, user, count1, count2) {
	 parentElement.innerHTML = `
       <div>
       <h2>Слово №${count1} з ${count2}</h2>
		 <div class="BoxOfWords">
		 <h3 style="color:red; font-size:20px;">${user.en}</h3>
		 <p>${user.ua}</p>
		 </div>
		 </div>`;
}



function ShowCardForAnswer(parentElement, user, count1, count2) {
       parentElement.innerHTML = `
       <div>
       <h2>Сесія: ${count1} з ${count2}</h2>
		 <div class="BoxOfWords">
		 <p>${user.en}</p>
		 </div>
		 <input type="text" placeholder="Ваша відповідь" class="BoxOfWords" id="onUA">
		 </div>`;
           
}

