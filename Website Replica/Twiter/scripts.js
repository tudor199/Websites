"use strict";

function myf(...rest) {
  rest.sort();
  console.log("rest:            ");
  console.log(rest);
}

function myfa() {
  var rez = Array.from(arguments);
    rez.sort();
  console.log("arguments:            ");
  console.log(rez);
}

myf(5,3,4);
myfa(5,3,4);
