function removeItem(x) {
    console.log(x);
    var parent = x.parentElement;
    console.log(parent);
    console.log(parent.parentElement);
    parent.parentElement.removeChild(parent);
}

function addItem() {
    var parent = document.getElementById("list");
    var item = document.getElementById("item").value;

    if (!item) {
        console.warn("Field is empty!");
        return;
    }
    arr = parent.getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++) {
        var cmpItem = arr[i].innerHTML.substring(0, arr[i].innerHTML.indexOf("<"));
        if (item.toLowerCase() == cmpItem.toLowerCase()) {
            console.warn("The item is already in your shopping list!");
            return;
        }
    }

    var newSpan = document.createElement("span");
    newSpan.innerHTML = "&times";
    newSpan.addEventListener("click", function () {
        removeItem(this);
    })

    var newLi = document.createElement("li");
    newLi.innerHTML = item;
    newLi.appendChild(newSpan);
    newLi.classList.add("listElement");

    parent.appendChild(newLi);
}
