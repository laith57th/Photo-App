var username = document.getElementById("username");
var pwd = document.getElementById("password");
var confm = document.getElementById("confirm");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var special = document.getElementById("special");

pwd.onfocus = function(){
 document.getElementById("message").style.visibility = "visible";
}

pwd.onblur = function() {
  document.getElementById("message").style.visibility = "hidden";
}

username.onfocus = function(){
 document.getElementById("message2").style.visibility = "visible";
}

username.onblur = function() {
  document.getElementById("message2").style.visibility = "hidden";
}

confm.onfocus = function(){
 document.getElementById("message3").style.visibility = "visible";
}

confm.onblur = function() {
  document.getElementById("message3").style.visibility = "hidden";
}

var upperCaseLetters = /[A-Z]/g;
pwd.onkeyup = function() {
 var upperCaseLetters = /[A-Z]/g;
  if(pwd.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
    
  }

  var numbers = /[0-9]/g;
  if(pwd.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");

  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
    
  }
  var specialchar = /[/*-+!@#$^&*]/;
 if(pwd.value.match(specialchar)){
  special.classList.remove("invalid");
  special.classList.add("valid");
 } else {
  special.classList.remove("valid");
  special.classList.add("invalid");
 }

  if(pwd.value.length >= 8) {
   length.classList.remove("invalid");
   length.classList.add("valid");

  } else {
   length.classList.remove("valid");
   length.classList.add("invalid");
   
  }
}

username.onkeyup = function() {
 var firstl = username.value.charAt(0);
 var specialchar = /[/*-+!@#$^&*]/;
 if(!(/[a-zA-Z]/).test(firstl)){
  firstletter.classList.remove("valid");
  firstletter.classList.add("invalid");
 }else{
  firstletter.classList.remove("invalid");
  firstletter.classList.add("valid");
 }
 if (username.value.length < 3 || username.value.match(specialchar)) {
  namelen.classList.remove("valid");
  namelen.classList.add("invalid");
 } else {
  namelen.classList.remove("invalid");
  namelen.classList.add("valid");
 }
}

confm.onkeyup = function() {
 if(confm.value === pwd.value){
  confirmation.classList.remove("invalid");
  confirmation.classList.add("valid");
 } else{
  confirmation.classList.remove("valid");
  confirmation.classList.add("invalid");
 }
}