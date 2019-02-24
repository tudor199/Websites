"use strict";

function removeItem(x) {
  var parent = x.parentElement;
  parent.removeChild(x);

  if (parent.childNodes.length == 0) {
    document.getElementById("msg").style.display = "block";
  }

}

function addItem() {
  var parent = document.getElementById("list");
  var item = document.getElementById("item");
  var itemName = item.value;

  if (!itemName) {
    alert("Field is empty!");
    return;
  }
  var arr = parent.getElementsByTagName("li");
  for (var i = 0; i < arr.length; i++) {
    var cmpItem = arr[i].innerHTML.substring(0, arr[i].innerHTML.indexOf("<"));
    if (itemName.toLowerCase() == cmpItem.toLowerCase()) {
      alert("The item is already in your shopping list!");
      return;
    }
  }

  var newSpan = document.createElement("span");
  newSpan.innerHTML = "&times";
  newSpan.addEventListener("click", function() {
    removeItem(this.parentElement);
  });


  var newLi = document.createElement("li");
  newLi.innerHTML = itemName;
  newLi.appendChild(newSpan);
  newLi.classList.add("listElement");

  document.getElementById("msg").style.display = "none";
  parent.appendChild(newLi);
  item.value = "";
}
