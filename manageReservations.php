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
	
	
	$.post(REQUEST_URL, {action : "GetVehiclesReserved", school : getCookie("school")}, function( data ) {
		var json = JSON.parse(data)
	
		if(json.length == 0) {
			$("#reservations").append("<p>There aren't any reservations.</p>");
		}
	
		var events = []
	
		for(reservation_index in json) {
	
			var reservation = json[reservation_index]
			
			var event = {title: reservation["vehicleName"] + " (" + reservation["owner"] + ")", start:formateDateISO(reservation["startDateTime"]), end:formateDateISO(reservation["endDateTime"])}
			
			events.push(event)
		
			$("#reservations").append("<tr class='reservation'><td>" + reservation["owner"] + "</td><td>" + reservation["vehicleName"] + "</td><td>" + formatDate(reservation["startDateTime"]) + "</td><td>" + formatDate(reservation["endDateTime"]) + "</td><td><a href='#'>Delete</a></td></tr>")
		}
		
		
		
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			defaultDate: new Date().toISOString(),
			editable: false,
			eventLimit: true, // allow "more" link when too many events
			events: events
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

<table id="reservations" class="chart" border="1">

<tr><th>User</th><th>Vehicle</th><th>Start time</th><th>End time</th><th>Delete</th></tr>

</table><br>

</div>

</body>
<?php echo file_get_contents("template_after.html") ?>