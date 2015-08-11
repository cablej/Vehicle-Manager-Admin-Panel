var REQUEST_URL = "../request.php"


/*

Set up for every page

*/

function initializePage() {
	var key = getCookie("key")
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
	$("#sign-in-error").text("Loading...")
	$.post(REQUEST_URL, {action : "SignIn", school : schoolEntered, password : passwordEntered}, function( data ) {
		console.log(json);
		console.log(data)
		var json = JSON.parse(data)
		console.log(json);
		console.log(data)
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
	
	$("#sign-up-error").text("Loading...")

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

function processRequest(timestamp, user, vehicleName, type) {
	
	$("#processRequest-status").text("Loading...")
	$.post(REQUEST_URL, {action : "ProcessRequest", key : getCookie("key"), timestamp : timestamp, type : type}, function( data ) {
		
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			$("#processRequest-status").text(json["error"])
			$("#processRequest-status").fadeIn("slow").delay(5000).fadeOut("slow");
			return
		}
		
		var verb = type == "approve" ? "approved" : "denied"
		$("#processRequest-status").text("Successfully " + verb + " the request by " + user + " for " + vehicleName + ".")
		$("#processRequest-status").fadeIn("slow").delay(5000).fadeOut("slow");
		$("#request-" + timestamp).remove();
	});
}

function removeReservation(vehicleName, user, startTime, endTime) {
	if (!window.confirm("Are you sure you want to delete the reservation by " + user + " for " + vehicleName +  "? This action cannot be undone.")) {
		return;
	}
	$("#removeReservation-status").text("Loading...")
	$.post(REQUEST_URL, {action : "RemoveReservation", key : getCookie("key"), vehicleName : vehicleName, owner : user, startTime: startTime, endTime: endTime}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			$("#removeReservation-status").text(json["error"])
			$("#removeReservation-status").fadeIn("slow").delay(5000).fadeOut("slow");
			return
		}
		
		$("#removeReservation-status").text("Successfully removed the reservation by " + user + " for " + vehicleName + ".")
		$("#removeReservation-status").fadeIn("slow").delay(5000).fadeOut("slow");
		var id = vehicleName + user + startTime + endTime
		id = id.replace(/\s+/g, '');
		id = id.replace(/:/g,'');
		$("#reservation-" + id).remove();
	});
}

function removeVehicle(vehicleName) {
	if (!window.confirm("Are you sure you want to delete the vehicle '" + vehicleName + "'? This action cannot be undone.")) {
		return;
	}
	$("#removeVehicle-status").text("Loading...")
	$.post(REQUEST_URL, {action : "RemoveVehicle", key : getCookie("key"), vehicleName : vehicleName}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			$("#removeVehicle-status").text(json["error"])
			$("#removeVehicle-status").fadeIn("slow").delay(5000).fadeOut("slow");
			return
		}
		
		$("#removeVehicle-status").text("Successfully removed the vehicle " + vehicleName + ".")
		$("#removeVehicle-status").fadeIn("slow").delay(5000).fadeOut("slow");
		var id = vehicleName
		id = id.replace(/\s+/g, '');
		id = id.replace(/:/g,'');
		$("#vehicle-" + id).remove();
	});
}

function addVehicle(vehicleName) {
	$("#removeVehicle-status").text("Loading...")
	$.post(REQUEST_URL, {action : "AddVehicle", key : getCookie("key"), vehicleName : vehicleName}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			$("#removeVehicle-status").text(json["error"])
			$("#removeVehicle-status").show("slow").delay(5000).fadeOut("slow");
			return
		}
		
		$("#removeVehicle-status").text("Successfully added the vehicle " + vehicleName + ".")
		$("#removeVehicle-status").fadeIn("slow").delay(5000).fadeOut("slow");
		var id = vehicleName
		id = id.replace(/\s+/g, '');
		id = id.replace(/:/g,'');
		$("#vehicles").append("<tr class='vehicle' id='vehicle-" + id + "'><td>" + vehicleName + "</td><td><a style='cursor:pointer' onclick=\x22removeVehicle('" + vehicleName + "')\x22>Delete</a></td></tr>")
	});
}

function addReservation(vehicleName, owner, startDate, endDate) {
	
	var startDateUnix = Date.parse(startDate)/1000;
	var endDateUnix = Date.parse(endDate)/1000;
	
	$("#addReservation-status").text("Loading...")
	
	$.post(REQUEST_URL, {action : "ReserveVehicle", key : getCookie("key"), vehicleName : vehicleName, owner: owner, startTime: startDateUnix, endTime: endDateUnix}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			$("#addReservation-status").text(json["error"])
			$("#addReservation-status").show("slow").delay(5000).fadeOut("slow");
			return
		}
		
		$("#addReservation-status").text("Successfully added the reservation by " + owner + " for " + vehicleName + ".")
		$("#addReservation-status").fadeIn("slow").delay(5000).fadeOut("slow");
		var id = vehicleName
		id = id.replace(/\s+/g, '');
		id = id.replace(/:/g,'');
		$("#reservations").append("<tr class='reservation' id='reservation-" + id + "'><td>" + owner + "</td><td>" + vehicleName + "</td><td>" + formatDate(startDateUnix) + "</td><td>" + formatDate(endDateUnix) + "</td><td><a style='cursor:pointer' onclick=\x22removeReservation('" + vehicleName + "', '" + owner + "', '" + startDateUnix + "', '" + endDateUnix + "')\x22>Delete</a></td></tr>")
	});
}

function changePassword(oldPassword, newPassword, confirmPassword) {

	if(newPassword != confirmPassword) {
		$("#changePassword-status").text("Passwords are not the same.")
		$("#changePassword-status").fadeIn("slow").delay(5000).fadeOut("slow");
		return
	}
	
	$("#changePassword-status").text("Loading...")
	
	$.post(REQUEST_URL, {action : "ChangePassword", key : getCookie("key"), oldPassword : oldPassword, newPassword: newPassword}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			$("#changePassword-status").text(json["error"])
			$("#changePassword-status").show("slow").delay(5000).fadeOut("slow");
			return
		}
		
		$("#changePassword-status").text("Successfully changed password.")
		$("#changePassword-status").fadeIn("slow").delay(5000).fadeOut("slow");	
		
		document.cookie = "school=" + json["school"]
		document.cookie = "key=" + json["key"]
	});
}

function changeEmail(password, newEmail, confirmEmail) {

	if(newEmail != confirmEmail) {
		$("#changeEmail-status").text("Emails are not the same.")
		$("#changeEmail-status").fadeIn("slow").delay(5000).fadeOut("slow");
		return
	}
	
	$("#changeEmail-status").text("Loading...")
	
	$.post(REQUEST_URL, {action : "ChangeEmail", key : getCookie("key"), password : password, newEmail: newEmail}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			$("#changeEmail-status").text(json["error"])
			$("#changeEmail-status").show("slow").delay(5000).fadeOut("slow");
			return
		}
		
		$("#changeEmail-status").text("Successfully changed email to " + newEmail + ".")
		$("#changeEmail-status").fadeIn("slow").delay(5000).fadeOut("slow");	
		
		document.cookie = "school=" + json["school"]
		document.cookie = "key=" + json["key"]
	});
}

function displayCalendar(type) {
	var action = "GetVehiclesReserved"
	if(type == "history") {
		action = "GetVehicleHistory"
	}

	$.post(REQUEST_URL, {action : action, school : getCookie("school")}, function( data ) {
		var json = JSON.parse(data)
	
		if(type == "reservations" && json.length == 0) {
			$("#reservations").append("<tr><td colspan='5'>There aren't any vehicles.</td></tr>");
		}
	
		var events = []
		
		$("#row-count").text("Displaying " + json.length + " of " + json.length + " reservations.")
	
		for(reservation_index in json) {
	
			var reservation = json[reservation_index]
			
			var event = {title: reservation["vehicleName"] + " (" + reservation["owner"] + ")", start:formateDateISO(reservation["startDateTime"]), end:formateDateISO(reservation["endDateTime"]), description: reservation["vehicleName"] + " (" + reservation["owner"] + ") " + formatDate(reservation["startDateTime"]) + " - " + formatDate(reservation["endDateTime"])}
			
			events.push(event)
			
			if(type == "requests") continue;
			
			var id = reservation["vehicleName"] + reservation["owner"] + reservation["startDateTime"] + reservation["endDateTime"]
			
			id = id.replace(/\s+/g, '');
			id = id.replace(/:/g,'');
		
			var deleteSection = ""
			
			if(type == "reservations") {
				deleteSection = "<td><a style='cursor:pointer' onclick=\x22removeReservation('" + reservation["vehicleName"] + "', '" + reservation["owner"] + "', '" + reservation["startDateTime"] + "', '" + reservation["endDateTime"] + "')\x22>Delete</a></td>"
			}
		
			$("#reservations").append("<tr class='reservation' id='reservation-" + id + "'><td>" + reservation["owner"] + "</td><td>" + reservation["vehicleName"] + "</td><td>" + formatDate(reservation["startDateTime"]) + "</td><td>" + formatDate(reservation["endDateTime"]) + "</td>" + deleteSection + "</tr>")
		}
		
		
		
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			timezone: "local",
			defaultDate: new Date().toISOString(),
			editable: false,
			eventLimit: true, // allow "more" link when too many events
			events: events,
			eventRender: function(event, element) {
            element.qtip({
                content: event.description,
                position: {
                    corner: {
                        target: 'center',
                        tooltip: 'bottomMiddle'
                    }
                }
            });
        }
		});
		
		pageLoaded()
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

function getCSVData(){
 var csv_value=$('#reservations').table2CSV({delivery:'value'});
 $("#csv_text").val(csv_value);	
}

