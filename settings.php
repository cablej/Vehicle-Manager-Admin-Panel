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
	
	pageLoaded()
	
});

</script>

<title>District 214 Vehicle Manager - Settings</title>

</head>

<body>

<?php echo file_get_contents("template_body.html") ?>

<div id="content">

<h3>Change password</h3>

<p id="changePassword-status"></p>

<input type="password" id="old-password" placeholder="Old password"></input><br><br>
<input type="password" id="new-password" placeholder="New password"></input><br><br>
<input type="password" id="confirm-password" placeholder="Confirm password"></input><br><br>

<button style="cursor:pointer" onclick="changePassword($('#old-password').val(), $('#new-password').val(), $('#confirm-password').val())">Change password</button><br><br>


<h3>Change email</h3>

<p id="changeEmail-status"></p>

<input type="password" id="password" placeholder="Password"></input><br><br>
<input type="text" id="new-email" placeholder="New email"></input><br><br>
<input type="text" id="confirm-email" placeholder="Confirm email"></input><br><br>

<button style="cursor:pointer" onclick="changeEmail($('#password').val(), $('#new-email').val(), $('#confirm-email').val())">Change email</button><br><br>


</div>

</body>
<?php echo file_get_contents("template_after.html") ?>