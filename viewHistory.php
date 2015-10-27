<?php echo file_get_contents("template_before.html") ?>
<head>

<script>
	
$( document ).ready(function() {
	initializePage()
	
	$(".menu a:nth-child(3)").addClass("current")
	
	var school = getCookie("school")
	var key = getCookie("key")
	
	if(school == "") window.location = "login.php"
	
	$("#content").append("Logged in as " + school + ". <a style='cursor:pointer' onclick='logout()'>Log out.</a>")
	
	displayCalendar("history")
	
});

</script>

<title>District 214 Vehicle Manager - History</title>

</head>

<body>

<?php echo file_get_contents("template_body.html") ?>

<center>

<div id="content">

<div id="calendar">

</div>

<p id="error-field"></p>

<p id="row-count"></p>

<form action="getCSV.php" method ="post" > 
<input type="hidden" name="csv_text" id="csv_text">
<input type="submit" value="Export to Excel Spreadsheet" 
       onclick="getCSVData()">
</form>

<table id="reservations" class="chart" border="1">

<tr><th>User</th><th>Vehicle</th><th>Start time</th><th>End time</th><th>Key Set</th><th>Gas Card</th></tr>

</table><br>

</div>

</center>

</div>

</body>
<?php echo file_get_contents("template_after.html") ?>