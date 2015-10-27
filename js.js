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

function addKeySet(vehicleName, keySetName) {
	$("#removeKeySet-status").text("Loading...")
	$.post(REQUEST_URL, {action : "AddKeySet", key : getCookie("key"), vehicleName : vehicleName, keySetName: keySetName}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			$("#removeKeySet-status").text(json["error"])
			$("#removeKeySet-status").show("slow").delay(5000).fadeOut("slow");
			return
		}
		
		$("#removeKeySet-status").text("Successfully added the key set " + keySetName + ".")
		$("#removeKeySet-status").fadeIn("slow").delay(5000).fadeOut("slow");
		var vehicleNameID = vehicleName	
		var keySetNameID = keySetName
		vehicleNameID = vehicleNameID.replace(/\s+/g, '');
		vehicleNameID = vehicleNameID.replace(/:/g,'');
		keySetNameID = keySetNameID.replace(/\s+/g, '');
		keySetNameID = keySetNameID.replace(/:/g,'');
		$("#keySets").append("<tr class='keySet' id='keySet-" + vehicleNameID + "-" + keySetNameID + "'><td>" + vehicleName + "</td><td>" + keySetName + "</td><td><a style='cursor:pointer' onclick=\x22removeKeySet('" + vehicleName + "', '" + keySetName + "')\x22>Delete</a></td></tr>")
	});
}

function removeKeySet(vehicleName, keySetName) {
	if (!window.confirm("Are you sure you want to delete the key set '" + keySetName + "'? This action cannot be undone.")) {
		return;
	}
	$("#removeKeySet-status").text("Loading...")
	$.post(REQUEST_URL, {action : "RemoveKeySet", key : getCookie("key"), vehicleName : vehicleName, keySetName: keySetName}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			$("#removeKeySet-status").text(json["error"])
			$("#removeKeySet-status").fadeIn("slow").delay(5000).fadeOut("slow");
			return
		}
		
		$("#removeKeySet-status").text("Successfully removed the key set " + keySetName + ".")
		$("#removeKeySet-status").fadeIn("slow").delay(5000).fadeOut("slow");
		var vehicleNameID = vehicleName	
		var keySetNameID = keySetName
		vehicleNameID = vehicleNameID.replace(/\s+/g, '');
		vehicleNameID = vehicleNameID.replace(/:/g,'');
		keySetNameID = keySetNameID.replace(/\s+/g, '');
		keySetNameID = keySetNameID.replace(/:/g,'');
		$("#keySet-" + vehicleNameID + "-" + keySetNameID).remove();
	});
}

function addGasCard(gasCardName) {
	$("#removeGasCard-status").text("Loading...")
	$.post(REQUEST_URL, {action : "AddGasCard", key : getCookie("key"), gasCardName : gasCardName}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			$("#removeGasCard-status").text(json["error"])
			$("#removeGasCard-status").show("slow").delay(5000).fadeOut("slow");
			return
		}
		
		$("#removeGasCard-status").text("Successfully added the gas card " + gasCardName + ".")
		$("#removeGasCard-status").fadeIn("slow").delay(5000).fadeOut("slow");
		var id = gasCardName
		id = id.replace(/\s+/g, '');
		id = id.replace(/:/g,'');
		$("#gasCards").append("<tr class='vehicle' id='gasCard-" + id + "'><td>" + gasCardName + "</td><td><a style='cursor:pointer' onclick=\x22removeGasCard('" + gasCardName + "')\x22>Delete</a></td></tr>")
	});
}

function removeGasCard(gasCardName) {
	if (!window.confirm("Are you sure you want to delete the gas card '" + gasCardName + "'? This action cannot be undone.")) {
		return;
	}
	$("#removeGasCard-status").text("Loading...")
	$.post(REQUEST_URL, {action : "RemoveGasCard", key : getCookie("key"), gasCardName : gasCardName}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			$("#removeGasCard-status").text(json["error"])
			$("#removeGasCard-status").fadeIn("slow").delay(5000).fadeOut("slow");
			return
		}
		
		$("#removeGasCard-status").text("Successfully removed the vehicle " + gasCardName + ".")
		$("#removeGasCard-status").fadeIn("slow").delay(5000).fadeOut("slow");
		var id = gasCardName
		id = id.replace(/\s+/g, '');
		id = id.replace(/:/g,'');
		$("#gasCard-" + id).remove();
	});
}

function getKeySets() {
	$.post(REQUEST_URL, {action : "GetKeySets", school : getCookie("school")}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			console.log("could not load key sets.")
			return
		}
		keySets = json
	});
}

function getGasCards() {
	$.post(REQUEST_URL, {action : "GetGasCards", school : getCookie("school")}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			console.log("could not load gas cards.")
			return
		}
		gasCards = json
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

function updateReservation(reservation) {
	
	$.post(REQUEST_URL, {action : "UpdateReservation", key : getCookie("key"), originalVehicleName : reservation["originalVehicleName"], originalOwner : reservation["originalOwner"], originalStartDate : reservation["originalStartDate"], originalEndDate : reservation["originalEndDate"], newVehicleName : reservation["newVehicleName"], newOwner : reservation["newOwner"], newStartDate : reservation["newStartDate"], newEndDate : reservation["newEndDate"], keySet : reservation["keySet"], gasCard : reservation["gasCard"]}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			console.log("could not update reservation: " + json["error"])
			return
		}
		
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
			
			
			var id = reservation["vehicleName"] + reservation["owner"] + reservation["startDateTime"] + reservation["endDateTime"]
			
			id = id.replace(/\s+/g, '');
			id = id.replace(/:/g,'');
			
			var event = {title: reservation["vehicleName"] + " (" + reservation["owner"] + ")", start:formateDateISO(reservation["startDateTime"]), end:formateDateISO(reservation["endDateTime"]), description: reservation["vehicleName"] + " (" + reservation["owner"] + ") " + formatDate(reservation["startDateTime"]) + " - " + formatDate(reservation["endDateTime"]), id: id}
			
			events.push(event)
			
			if(type == "requests") continue;
		
			var deleteSection = ""
			var editSection = ""
			
			if(type == "reservations") {
				deleteSection = "<td class='delete'><a style='cursor:pointer' onclick=\x22removeReservation('" + reservation["vehicleName"] + "', '" + reservation["owner"] + "', '" + reservation["startDateTime"] + "', '" + reservation["endDateTime"] + "')\x22>Delete</a></td>"
				editSection = "<td class='edit'><a style='cursor:pointer' onclick=\x22beginEditing('reservation-" + id + "')\x22>Edit</a></td>"
			}
		
			$("#reservations").append("<tr class='reservation' name='reservation-" + id + "' id='reservation-" + id + "'><td class='owner'>" + reservation["owner"] + "</td><td class='vehicleName'>" + reservation["vehicleName"] + "</td><td class='startDate'>" + formatDate(reservation["startDateTime"]) + "</td><td class='endDate'>" + formatDate(reservation["endDateTime"]) + "</td><td class='keySet'>" + reservation["keySet"] + "</td><td class='gasCard'>" + reservation["gasCard"] + "</td>" + editSection + deleteSection + "</tr>")
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
                }});
				var eventText = "<a style='color:white' href='#reservation-" + event.id + "'>" + element.find('span.fc-title').text() + "</a>";
				element.find('span.fc-title').html(eventText);
            
       		}
		});
		
		pageLoaded()
	});
}

/*

Helper methods

*/

function beginEditing(id) {
	$("#" + id).find('td').each (function() {
		var tdclass = $(this).attr('class')
	  	if(tdclass == "edit") {
	  		$(this).html("<a style='cursor:pointer' onclick=\x22endEditing('" + id + "')\x22>Save</a>")
	  	} else if(tdclass != "delete") {
	  		var text = $(this).html();
	  		
	  		inputID = tdclass + id
	  		
	  		if(tdclass == "gasCard" || tdclass == "keySet") {
	  			var htmlToReplace = "<select style='width:100px'>"
	  			var setToIterate = tdclass == "gasCard" ? gasCards : keySets;
	  			for(var index in setToIterate) {
	  				var object = setToIterate[index];
	  				if(tdclass == "gasCard") htmlToReplace += "<option value='" + object["gasCardName"] + "'>" + object["gasCardName"] + "</option>"
	  				else htmlToReplace += "<option value='" + object["vehicleName"] + " " + object["keySetName"] + "'>" + object["vehicleName"] + " " + object["keySetName"] + "</option>"
	  			}
	  			htmlToReplace += "</select>"
	  			$(this).replaceWith('<td class="' + tdclass + '">' + htmlToReplace + '</td>');
	  		} else {	  		
				$(this).replaceWith('<td class="' + tdclass + '"><input type="hidden" value="' + text + '"></input><input id="' + inputID + '" style="width:100px" type="text" value="' + text + '"></input></td>');
			
				if(tdclass == "startDate" || tdclass == "endDate") {
					console.log(text);
					$('#' + inputID).datetimepicker({step:60, defaultDate:new Date(text)});
				}
	  		}
	  			
	  	}
	});    
}

function endEditing(id) {
	var reservationData = {}
	$("#" + id).find('td').each (function() {
		var tdclass = $(this).attr('class')
	  	if(tdclass == "edit") {
	  		$(this).html("<a style='cursor:pointer' onclick=\x22beginEditing('" + id + "')\x22>Edit</a>")
	  	} else if(tdclass != "delete") {
	  		
	  		inputID = tdclass + id
	  		
	  		if(tdclass == "gasCard" || tdclass == "keySet") {
	  			var text = $(this).find('option:selected').text()
	  			var value = $(this).find('select').val()
	  			$(this).replaceWith('<td>' + text + '</td>');
				reservationData[tdclass] = value;
	  		} else {
	  			var value = $(this).find('input[type=text]').val();
	  			var originalValue = $(this).find('input[type=hidden]').val();
	  			if(tdclass == "startDate" || tdclass == "endDate") {
	  				reservationData["new" + tdclass.capitalizeFirstLetter()] = Date.parse(value)/1000;
	  				reservationData["original" + tdclass.capitalizeFirstLetter()] = Date.parse(originalValue)/1000;
	  			} 
	  			else  {
	  				reservationData["new" + tdclass.capitalizeFirstLetter()] = value;
	  				reservationData["original" + tdclass.capitalizeFirstLetter()] = originalValue;
	  			}
				$(this).replaceWith('<td class="' + tdclass + '">' + value + '</td>');
	  		}
	  			
	  	}
	});
	updateReservation(reservationData)
}

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
	var formatted = $.format.date(t, "MM/dd/yy hh:mm a");
	return formatted;
}

function formatDateOnly(d) {
  	var t = new Date(d * 1000);
	var formatted = $.format.date(t, "MM/dd/yy");
	return formatted;
}

function formatTimeOnly(d) {
  	var t = new Date(d * 1000);
	var formatted = $.format.date(t, "hh:mm a");
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

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

