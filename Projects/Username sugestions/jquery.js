$(document).ready(function(){
    $("p").click(function(){
      $(".demo").hide("slow");
    });
});

function getHint(str) {
    if (str === "") {
        document.getElementById("hintResult").innerHTML = "";
        return;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("hintResult").innerHTML = this.responseText;
        }
    }
    // GET
    xhttp.open("GET","./search_user.php?pattern=" + str, true);
    xhttp.send();

    // POST
    // xhttp.open("POST", "./search_user.php", true);
    // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhttp.send("pattern=" + str);
}
