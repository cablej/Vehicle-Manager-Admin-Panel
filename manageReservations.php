<?php echo file_get_contents("template_before.html") ?>
<head>

<script>
	
$( document ).ready(function() {
	initializePage()
	
	$(".menu a:nth-child(2)").addClass("current")
	
	var school = getCookie("school")
	var key = getCookie("key")
	
	if(school == "") window.location = "login.php"
	
	$("#content").append("Logged in as " + school + ". <a style='cursor:pointer' onclick='logout()'>Log out.</a>")
	
	jQuery('#add-reservation-start-date').datetimepicker({step:15});
	jQuery('#add-reservation-end-date').datetimepicker({step:15});
	
	$.post(REQUEST_URL, {action : "GetVehiclesReserved", school : getCookie("school")}, function( data ) {
		var json = JSON.parse(data)
	
		if(json.length == 0) {
			$("#reservations").append("<tr><td colspan='5'>There aren't any vehicles.</td></tr>");
		}
	
		var events = []
	
		for(reservation_index in json) {
	
			var reservation = json[reservation_index]
			
			var event = {title: reservation["vehicleName"] + " (" + reservation["owner"] + ")", start:formateDateISO(reservation["startDateTime"]), end:formateDateISO(reservation["endDateTime"]), description: reservation["vehicleName"] + " (" + reservation["owner"] + ") " + formatDate(reservation["startDateTime"]) + " - " + formatDate(reservation["endDateTime"])}
			
			events.push(event)
		
			var id = reservation["vehicleName"] + reservation["owner"] + reservation["startDateTime"] + reservation["endDateTime"]
			
			id = id.replace(/\s+/g, '');
			id = id.replace(/:/g,'');
		
			$("#reservations").append("<tr class='reservation' id='reservation-" + id + "'><td>" + reservation["owner"] + "</td><td>" + reservation["vehicleName"] + "</td><td>" + formatDate(reservation["startDateTime"]) + "</td><td>" + formatDate(reservation["endDateTime"]) + "</td><td><a style='cursor:pointer' onclick=\x22removeReservation('" + reservation["vehicleName"] + "', '" + reservation["owner"] + "', '" + reservation["startDateTime"] + "', '" + reservation["endDateTime"] + "')\x22>Delete</a></td></tr>")
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
	
});

</script>

<title>District 214 Vehicle Manager - Manage Reservations</title>

</head>

<body>

<?php echo file_get_contents("template_body.html") ?>

<div id="content">

<p id="error-field"></p>

<div id='calendar'></div><br><br>

<p id='removeReservation-status'></p>

<table id="reservations" class="chart" border="1">

<tr><th>User</th><th>Vehicle</th><th>Start time</th><th>End time</th><th>Delete</th></tr>

</table><br>

<h3>Manually add a reservation</h3>

<p id='addReservation-status'></p>

<input type="text" id="add-reservation-vehicle-name" placeholder="Vehicle name"><br><br></input><input type="text" id="add-reservation-owner" placeholder="User name"></input><br><br><input type="text" id="add-reservation-start-date" placeholder="Start date and time"></input><br><br><input type="text" id="add-reservation-end-date" placeholder="End date and time"></input><br><br><button style="cursor:pointer" onclick="addReservation($('#add-reservation-vehicle-name').val(), $('#add-reservation-owner').val(), $('#add-reservation-start-date').val(), $('#add-reservation-end-date').val())">Add Reservation</button><br><br>

</div>

</body>
<?php echo file_get_contents("template_after.html") ?>