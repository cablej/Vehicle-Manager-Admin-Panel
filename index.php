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
			$("#requests").append("<p>There aren't any requests.</p>");
		}
	
		for(request_index in json) {
	
			var request = json[request_index]
		
			$("#requests").append("<tr class='request'><td>" + request["user"] + "</td><td>" + request["email"] + "</td><td>" + request["vehicleName"] + "</td><td>" + formatDate(request["startDateTime"]) + "</td><td>" + formatDate(request["endDateTime"]) + "</td><td>" + formatDate(request["timestamp"]) + "</td><td><a href='#'>Approve</a></td><td><a href='#'>Deny</a></td></tr>")
		}
		
		pageLoaded()
	});
	
});

</script>

<title>District 214 Vehicle Manager - Requests</title>

</head>

<body>

<?php echo file_get_contents("template_body.html") ?>

<div id="content">

<p id="error-field"></p>

<table id="requests" class="chart" border="1">

<tr><th>Name</th><th>Email</th><th>Vehicle</th><th>Start time</th><th>End time</th><th>Time requested</th><th>Approve</th><th>Deny</th></tr>

</table><br>

</div>

</div>

</body>
<?php echo file_get_contents("template_after.html") ?>