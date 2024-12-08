var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");

var signupArray = JSON.parse(localStorage.getItem("users")) || [];

function signupEmpty() {
  return (
    signupName.value.trim() !== "" &&
    signupEmail.value.trim() !== "" &&
    signupPassword.value.trim() !== ""
  );
}

function isemailExist() {
  return signupArray.some(
    (user) => user.email.toLowerCase() === signupEmail.value.toLowerCase()
  );
}

function signup() {
  if (!signupEmpty()) {
    document.getElementById("info").innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
    return;
  }

  if (isemailExist()) {
    document.getElementById("info").innerHTML =
      '<span class="text-danger m-3">Email already exists</span>';
    return;
  }

  var user = {
    name: signupName.value.trim(),
    email: signupEmail.value.trim(),
    password: signupPassword.value.trim(),
  };

  signupArray.push(user);
  localStorage.setItem("users", JSON.stringify(signupArray));

  document.getElementById("info").innerHTML =
    '<span class="text-success m-3">Registration successful. Redirecting...</span>';

  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";

  setTimeout(function () {
    window.location.href = "login.html";
  }, 2000);
}

function LoginEmpty() {
  return loginEmail.value.trim() !== "" && loginPassword.value.trim() !== "";
}

function login() {
  if (!LoginEmpty()) {
    document.getElementById("incorrect").innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
    return;
  }

  var email = loginEmail.value.trim();
  var password = loginPassword.value.trim();

  var user = signupArray.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );

  if (user) {
    localStorage.setItem("access", user.name);
    document.getElementById("incorrect").innerHTML =
      '<span class="text-success m-3">Login successful. Redirecting...</span>';

    setTimeout(function () {
      window.location.href = "welcome.html";
      displayUsername();
    }, 2000);
  } else {
    document.getElementById("incorrect").innerHTML =
      '<span class="text-danger m-3">Invalid email or password</span>';
  }
}

function logout() {
  localStorage.removeItem("access");
  window.location.href = "login.html";
}

function displayUsername() {
  var username = localStorage.getItem("access");
  if (username) {
    document.getElementById("username").innerHTML = "Welcome " + username;
  } else {
    window.location.href = "login.html";
  }
}

function back() {
  window.location.href = "signup.html";
}
