"use strict";

function makeElement(type, value) {
    console.log(type);
    console.log(value);
}


function makeList(list, n) {
    console.log(list);
    for (var i = 0; i < n; i++) {
        list.appendChild(makeElement("option", i.toString));
    }
}

























// TODO: load first n lines of js code
