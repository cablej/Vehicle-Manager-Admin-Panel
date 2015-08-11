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
	
	jQuery('#add-reservation-start-date').datetimepicker({step:60});
	jQuery('#add-reservation-end-date').datetimepicker({step:60});
	
	displayCalendar("reservations")
	
});

</script>

<title>District 214 Vehicle Manager - Manage Reservations</title>

</head>

<body>

<?php echo file_get_contents("template_body.html") ?>

<center>

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

</center>

</body>
<?php echo file_get_contents("template_after.html") ?>