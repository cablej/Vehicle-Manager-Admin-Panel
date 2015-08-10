var REQUEST_URL = "../request.php"


/*

Set up for every page

*/

function initializePage() {
	var key = getCookie("key")
	if(key != "") {
		/*$("#username").text(getCookie("username"))
		$("#login").hide()
		$("#logout").show()*/
	}
}

function pageLoaded() {

}

function logout() {
	document.cookie = "school="
	document.cookie = "key="
	window.location = "login.php"
}

/*

HTTP POST requests to REQUEST_URL

*/

function logIn(schoolEntered, passwordEntered) {
	$.post(REQUEST_URL, {action : "SignIn", school : schoolEntered, password : passwordEntered}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			$("#sign-in-error").text(json["error"])
			return
		}	
		document.cookie = "school=" + json["school"]
		document.cookie = "key=" + json["key"]
		window.location = "index.php"
	});
}

function createAccount(schoolEntered, emailEntered, passwordEntered, confirmPasswordEntered) {
	
	if(passwordEntered != confirmPasswordEntered) {
		$("#sign-up-error").text("Passwords are not the same.")
		return
	}

	$.post(REQUEST_URL, {action : "SignUp", school : schoolEntered, email : emailEntered, password : passwordEntered}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			$("#sign-up-error").text(json["error"])
			return
		}	
		document.cookie = "school=" + json["school"]
		document.cookie = "key=" + json["key"]
		window.location = "index.php"
	});
}

/*

Helper methods

*/

//Returns the HTTP GET parameter by the given name, or "" if it does not exist
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Returns the Cookie for the given name, or "" if it does not exist
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

//returns a date from a given MYSQL timestamp
function dateFromTimestamp(timestamp) {
	var t = timestamp.split(/[- :]/);
	return new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
}

function formatDate(d){
  	var t = new Date(d * 1000);
	var formatted = $.format.date(t, "MM/dd/yyyy hh:mm a");
	return formatted;
}

function formateDateISO(d) {
  	var t = new Date(d * 1000);
	var formatted = t.toISOString();
	return formatted;
}

