const passwordInput = document.querySelector('.passwordReveal')

function passwordReveal() {
    var x = passwordInput;
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

function passwordSubmit() {
    var x = passwordInput;
    x.type = "password";
}