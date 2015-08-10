<?php echo file_get_contents("template_before.html") ?>
<head>

<script>

pageLoaded()
	
$( document ).ready(function() {

	$("#login-password").keyup(function(event){
		if(event.keyCode == 13){
			$("#submit-login").click();
		}
	});
	
	$("#signup-cpassword").keyup(function(event){
		if(event.keyCode == 13){
			$("#submit-signup").click();
		}
	});


	initializePage()
});



</script>

<title>d214 MFSAB</title>

</head>

<body>

<?php echo file_get_contents("template_body.html") ?>
<script>

$( document ).ready(function() {
	$(".menu").hide()
});
</script>
<p>Welcome to d214 MFSAB!</p>
<p>Log into a school</p>

<div id="signin">
School name: <input type="text" placeholder="School name" id="login-name"></input><br><br>
Password: <input type="password" placeholder="Password" id="login-password"></input><br><br>
<button style="cursor:pointer" id='submit-login' onclick="logIn($('#login-name').val(), $('#login-password').val())">Submit</button><br><br>
<p id="sign-in-error"></p>
</div>

<p>Sign up for a school</p>

<div id="signup">
School name: <input type="text" placeholder="School name" id="signup-name"></input><br><br>
Email: <input type="text" placeholder="Email" id="signup-email"></input><br><br>
Password: <input type="password" placeholder="Password" id="signup-password"></input><br><br>
Confirm password: <input type="password" placeholder="Confirm password" id="signup-cpassword""></input><br><br>
<button style="cursor:pointer" id='submit-signup' onclick="createAccount($('#signup-name').val(), $('#signup-email').val(), $('#signup-password').val(), $('#signup-cpassword').val())">Submit</button><br><br>
<p id="sign-up-error"></p>
</div>

</body>
<?php echo file_get_contents("template_after.html") ?>