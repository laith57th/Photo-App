function loadXMLDoc() {
 var xml = new XMLHttpRequest();
 var mainDiv = document.getElementById("container");
 let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos";
 xml.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
   var photo = JSON.parse(this.responseText);
   length = photo.length;
   document.getElementById('items-count').innerHTML = `There are ${length} photo(s) being shown`;
   photo.forEach((obj) => createPhotoCard(obj, mainDiv));
  }
 };
 xml.open(
  "GET",
  fetchURL,
  true
 );
 xml.send();
}

function createPhotoCard(obj, mainDiv){
 var temp = mainDiv
 .innerHTML += `<div id=${obj.id} class="gallery" onclick="fadeOut(${obj.id})">
                     <img
                     src=${obj.url}
                     width="600"
                     height="600"
                     />
                 <div class="desc">${obj.title}</div>
                 </div>`;
 return temp;
}
function fadeOut(event) {
 var element = document.getElementById(event);
 var op = 0.5;
 var timer = setInterval(function () {
  if (op <= 0.1) {
   clearInterval(timer);
   element.remove();
   length--;
   document.getElementById("items-count")
   .innerHTML = `There are ${length} photo(s) being shown`; 
  }
  element.style.opacity = op;
  op -= 0.1;
 }, 25);
}