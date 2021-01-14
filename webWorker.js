onmessage = function(event) {

  
  var polePC = najdi(event.data.from, event.data.to);
  postMessage(
   {messageType: "vystupList", data: polePC}
  );
};



function najdi(odCisla, doCisla) {
  // create an Array to zoznamCisel all numbers within the specified range.
  var zoznamCisel = [];
  for (var i=Number(odCisla); i<=Number(doCisla); i++) {
    if (i>1) zoznamCisel.push(i);
  }

  // check if the no's are primeNos
  var pomocneC = Math.round(Math.sqrt(doCisla));
  var polePC = [];

  var novyPokrok;

  for (var i=0; i<zoznamCisel.length; i++) {
    var failed = false;
    for (var j=2; j<=pomocneC; j++) {
      if ((zoznamCisel[i] != j) && (zoznamCisel[i] % j == 0)) {
        failed = true;
      } else if ((j==pomocneC) && (failed == false)) {
        polePC.push(zoznamCisel[i]);
      }
    }

    // Continiously updateresults
    var pokrok = Math.round((i+1)/zoznamCisel.length*100);
    if (pokrok != novyPokrok) {
      postMessage(
       {messageType: "Progress", data: pokrok}
      );
      novyPokrok = pokrok;    
    }
  }

  return polePC;
}