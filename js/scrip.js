var worker;
var zobrazStav;
var tlacidloZacni;

window.onload = function(){
	zobrazStav = document.getElementById("pokrok"); 
	tlacidloZacni = document.getElementById("tlacidlo");
}


function kontrola(){
	var pat = /^[0-9]+$/;
	var cisloOD = document.getElementById('hc1od');
	var cisloDO = document.getElementById("hc1do");
	
	if(!(pat.test(cisloOD.value))&& cisloOD.value != ""){
			cisloOD.value="";
			window.alert("Zadajte len čísla");
		}
	else if(!(pat.test(cisloDO.value)) && cisloDO.value != "" ){
			cisloDO.value="";
			window.alert("Zadajte len čísla");
		}
}

function urobVypocet(){
	tlacidloZacni.disabled = true;
	
	var cisloOD = document.getElementById('hc1od').value;
	var cisloDO = document.getElementById('hc1do').value;
	
	worker = new Worker("webWorker.js");
	worker.onmessage = spracujWorkerMessage;
	worker.onerror = spracujWorkerError;
	
	worker.postMessage({from: cisloOD, to: cisloDO});
	
	
}

function spracujWorkerMessage(event){
	var message = event.data;
	
	
	if(message.messageType == "vystupList"){
		var out = message.data;
		var vystupList = "";
		for (var i=0; i<out.length; i++) {
			vystupList += out[i];
		if (i != out.length-1) vystupList += ", ";
		}
		
		var vypisTabulke = document.getElementById("tabulkaCisel");
		vypisTabulke.innerHTML = vystupList;
		
		if (vystupList.length == 0){
			vypisTabulke.innerHTML = "Výpočet ukončený bez zadaných čísel alebo zle zadaných čísel.";
			}
		tlacidloZacni.disabled = false;
	}
	else if(message.messageType == "Progress"){
		var dizajn  = document.getElementById("percentaPolicko");
		document.getElementById("percentaCisla").innerHTML = message.data + "%";
		dizajn.style.width = message.data + "%";
	}
}

function spracujWorkerError(error){
	zobrazStav.innerHTML = error.message;
}