"use strict";

function signIn() {
    window.location.href = "https://accounts.google.com";
}

function search() {
    var pattern = document.getElementById("pattern").value;
    window.location.href = "https://www.google.com/search?&q=" + pattern;
}

function showAppsMenu() {
    window.location.href = "https://about.google/intl/en/products/";
}

function google() {
    window.location.href = "https://www.google.com"
}
