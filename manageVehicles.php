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
	});
	
	$.post(REQUEST_URL, {action : "GetKeySets", school : school}, function( data ) {
		var json = JSON.parse(data)
		if(json.length == 0) {
			$("#keySets").append("<tr><td colspan='3'>There aren't any key sets.</td></tr>");
		}
		var events = []
		for(keyset_index in json) {
			var keySet = json[keyset_index]
			var vehicleName = keySet["vehicleName"]	
			var keySetName = keySet["keySetName"]
			vehicleName = vehicleName.replace(/\s+/g, '');
			vehicleName = vehicleName.replace(/:/g,'');
			keySetName = keySetName.replace(/\s+/g, '');
			keySetName = keySetName.replace(/:/g,'');
			$("#keySets").append("<tr class='keySet' id='keySet-" + vehicleName + "-" + keySetName + "'><td>" + keySet["vehicleName"] + "</td><td>" + keySet["keySetName"] + "</td><td><a style='cursor:pointer' onclick=\x22removeKeySet('" + keySet["vehicleName"] + "', '" + keySet["keySetName"] + "')\x22>Delete</a></td></tr>")
		}
	});
	
	$.post(REQUEST_URL, {action : "GetGasCards", school : school}, function( data ) {
		var json = JSON.parse(data)
		if(json.length == 0) {
			$("#gasCards").append("<tr><td colspan='2'>There aren't any gas cards.</td></tr>");
		}
		var events = []
		for(gasCard_index in json) {
			var gasCard = json[gasCard_index]
			var id = gasCard["gasCardName"]			
			id = id.replace(/\s+/g, '');
			id = id.replace(/:/g,'');
			$("#gasCards").append("<tr class='gasCard' id='gasCard-" + id + "'><td>" + gasCard["gasCardName"] + "</td><td><a style='cursor:pointer' onclick=\x22removeGasCard('" + gasCard["gasCardName"] + "')\x22>Delete</a></td></tr>")
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

<h3>Add a vehicle</h3>

<input type="text" id="add-vehicle" placeholder="Vehicle name"></input><br><br><button style="cursor:pointer" onclick="addVehicle($('#add-vehicle').val())">Add Vehicle</button><br><br>

<p id='removeVehicle-status'></p>

<table id="vehicles" class="chart" border="1">

<tr><th>Name</th><th>Delete</th></tr>

</table>

<hr>

<h3>Add a key set</h3>

<input type="text" id="add-key-set-vehicle" placeholder="Vehicle name"></input><br><br><input type="text" id="add-key-set" placeholder="Key set name"></input><br><br><button style="cursor:pointer" onclick="addKeySet($('#add-key-set-vehicle').val(), $('#add-key-set').val())">Add Key Set</button><br><br>

<p id='removeKeySet-status'></p>

<table id="keySets" class="chart" border="1">

<tr><th>Vehicle</th><th>Key Set Name</th><th>Delete</th></tr>

</table>

<hr>

<h3>Add a gas card</h3>

<input type="text" id="add-gas-card" placeholder="Gas card name"></input><br><br><button style="cursor:pointer" onclick="addGasCard($('#add-gas-card').val())">Add Gas Card</button><br><br>

<p id='removeGasCard-status'></p>

<table id="gasCards" class="chart" border="1">

<tr><th>Gas Card Name</th><th>Delete</th></tr>

</table><br><br>

</div>

</center>

</body>
<?php echo file_get_contents("template_after.html") ?>