async function main(){
  var getTimeValue = new Promise(function(resolve,reject) {
    chrome.storage.sync.get({
      //default to three seconds if none present in storage
        activeTime: 3000
      }, function(items) {
        console.log("storage time : "+items.activeTime);
        resolve(parseInt(items.activeTime));
      });
  });

  var timeToLoad = await getTimeValue.then(function (value){return value});
  console.log("time To load: "+timeToLoad);
  clearBasics()
  setTimeout(clearOverflows, timeToLoad)

  function clearBasics() {
    console.log("clear Basics First")
    let styleContents = document.getElementsByTagName("div");
    
    Array.from(styleContents).forEach( function (styleContent) {
      if (typeof(styleContent.attributes) !== "undefined" && typeof(styleContent.attributes.style) !== "undefined"){
        styleContentValue = styleContent.attributes.style.nodeValue
        //this specific tag will keep respawning if removed so instead remove the content that will stop display and stop clicks
        if (styleContentValue.includes("opacity: 0.01")){
          console.log("going to remove the style for this tag: "+styleContent.attributes.style.nodeValue)
          styleContent.attributes.style.nodeValue="";
          console.log(styleContent);
        }
      }
    });
  }

  function clearOverflows(){
    console.log("Clearing overflows")
    if (typeof(document.getElementsByTagName("body")[0].attributes.style) !== "undefined" && typeof(document.getElementsByTagName("body")[0].attributes.style.nodeValue) !== "undefined"){
      let styleContent = document.getElementsByTagName("body")[0].attributes.style.nodeValue
      if(styleContent == "overflow: hidden;"){
        document.getElementsByTagName("body")[0].attributes.style.nodeValue = ""
      }
    }
    let element = document.getElementsByClassName("fc-dialog-overlay")[0];
    if(typeof(element) !== "undefined"){
      element.parentElement.removeChild(element);
    }

    element = document.getElementsByClassName("fc-root fc-dialog-container")[0];
    if(typeof(element) !== "undefined"){
      element.parentNode.removeChild(element);
    }
  }
}

main()
  .then (() => {
    console.log("Done");
  })
  .catch( err => {
    console.log("Error: ", err, {});
  })

