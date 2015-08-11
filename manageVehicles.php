<?php echo file_get_contents("template_before.html") ?>
<head>

<script>
	
$( document ).ready(function() {
	initializePage()
	
	$(".menu a:nth-child(4)").addClass("current")
	
	var school = getCookie("school")
	var key = getCookie("key")
	
	if(school == "") window.location = "login.php"
	
	$("#content").append("Logged in as " + school + ". <a style='cursor:pointer' onclick='logout()'>Log out.</a>")
	
	
	$.post(REQUEST_URL, {action : "GetVehicles", school : school}, function( data ) {
		var json = JSON.parse(data)
	
		if(json.length == 0) {
			$("#vehicles").append("<tr><td colspan='2'>There aren't any vehicles.</td></tr>");
		}
	
		var events = []
	
		for(vehicle_index in json) {
	
			var vehicle = json[vehicle_index]
			
			var id = vehicle["vehicleName"]
			
			id = id.replace(/\s+/g, '');
			id = id.replace(/:/g,'');
		
			$("#vehicles").append("<tr class='vehicle' id='vehicle-" + id + "'><td>" + vehicle["vehicleName"] + "</td><td><a style='cursor:pointer' onclick=\x22removeVehicle('" + vehicle["vehicleName"] + "')\x22>Delete</a></td></tr>")
		}
		
		pageLoaded()
	});
});

</script>

<title>District 214 Vehicle Manager - Manage Vehicles</title>

</head>

<body>

<?php echo file_get_contents("template_body.html") ?>

<center>

<div id="content">

<p id='removeVehicle-status'></p>

<table id="vehicles" class="chart" border="1">

<tr><th>Name</th><th>Delete</th></tr>

</table>

<h3>Add a vehicle</h3>

<input type="text" id="add-vehicle" placeholder="Vehicle name"></input><br><br><button style="cursor:pointer" onclick="addVehicle($('#add-vehicle').val())">Add Vehicle</button><br><br>

</div>

</center>

</body>
<?php echo file_get_contents("template_after.html") ?>