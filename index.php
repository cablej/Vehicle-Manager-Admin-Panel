<?php echo file_get_contents("template_before.html") ?>
<head>

<script>
	
$( document ).ready(function() {
	initializePage()
	
	$(".menu a:nth-child(1)").addClass("current")
	
	var school = getCookie("school")
	var key = getCookie("key")
	
	if(school == "") window.location = "login.php"
	
	$("#content").append("Logged in as " + school + ". <a style='cursor:pointer' onclick='logout()'>Log out.</a>")
	
	
	$.post(REQUEST_URL, {action : "GetRequests", key : getCookie("key")}, function( data ) {
		var json = JSON.parse(data)
	
		if(json.length == 0) {
			$("#requests").append("<tr><td colspan='11'>There aren't any requests.</td></tr>");
		}
	
		for(request_index in json) {
	
			var request = json[request_index]
		
			$("#requests").append("<tr class='request' id='request-" + request["timestamp"] + "'><td>" + request["user"] + "</td><td>" + request["email"] + "</td><td>" + request["vehicleName"] + "</td><td>" + formatDateOnly(request["startDateTime"]) + "</td><td>" + formatTimeOnly(request["startDateTime"]) + "</td><td>" + formatDateOnly(request["endDateTime"]) + "</td><td>" + formatTimeOnly(request["endDateTime"]) + "</td><td>" + formatDateOnly(request["timestamp"]) + "</td><td>" + formatTimeOnly(request["timestamp"]) + "</td><td><a style='cursor:pointer' onclick=\x22processRequest('" + request["timestamp"] + "', '" + request["user"] + "', '" + request["vehicleName"] + "', 'approve')\x22>Approve</a></td><td><a style='cursor:pointer' onclick=\x22processRequest('" + request["timestamp"] + "', '" + request["user"] + "', '" + request["vehicleName"] + "', 'deny')\x22>Deny</a></td></tr>")
		}
		
	});
	
	displayCalendar("requests")
	
});

</script>

<title>District 214 Vehicle Manager - Requests</title>

</head>

<body>

<?php echo file_get_contents("template_body.html") ?>

<center>

<div id="content">

<div id="calendar">

</div>

<p id="error-field"></p>

<p id="processRequest-status"></p>

<table id="requests" class="chart" border="1">

<tr><th>Name</th><th>Email</th><th>Vehicle</th><th>Start date</th><th>Start time</th><th>End date</th><th>End time</th><th>Date requested</th><th>Time requested</th><th>Approve</th><th>Deny</th></tr>

</table><br>

</div>

</center>

</div>

</body>
<?php echo file_get_contents("template_after.html") ?>