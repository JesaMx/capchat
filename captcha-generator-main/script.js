// selecciona los elementos del doom necesarios 
const captchaTextBox = document.querySelector(".captch_box input");
const refreshButton = document.querySelector(".refresh_button");
const captchaInputBox = document.querySelector(".captch_input input");
const message = document.querySelector(".message");
const submitButton = document.querySelector(".button");

// variable para almacenar el captcha necesario
let captchaText = null;

// funcion para necerar captcha
const generateCaptcha = () => {
  const randomString = Math.random().toString(36).substring(2, 7);
  const randomStringArray = randomString.split("");
  const changeString = randomStringArray.map((char) => (Math.random() > 0.5 ? char.toUpperCase() : char));
  captchaText = changeString.join("   ");
  captchaTextBox.value = captchaText;
  console.log(captchaText);
};

const refreshBtnClick = () => {
  generateCaptcha();
  captchaInputBox.value = "";
  captchaKeyUpValidate();
};

const captchaKeyUpValidate = () => {
  //alternar la clase de desactivacion del boton del evento segun el campo de entrada del captcha
  submitButton.classList.toggle("disabled", !captchaInputBox.value);

  if (!captchaInputBox.value) message.classList.remove("active");
};

// funcion para validadr el captcha generado 
const submitBtnClick = () => {
  captchaText = captchaText
    .split("")
    .filter((char) => char !== " ")
    .join("");
  message.classList.add("active");
  // compruebe si el texto captcha introduccido es correcto o no 
  if (captchaInputBox.value === captchaText) {
    message.innerText = "Entered captcha is correct";
    message.style.color = "#826afb";
  } else {
    message.innerText = "Entered captcha is not correct";
    message.style.color = "#FF2525";
  }
};

// agregue detectores del evento para el boton de actualizacion, captchalnputbox boton de envio
refreshButton.addEventListener("click", refreshBtnClick);
captchaInputBox.addEventListener("keyup", captchaKeyUpValidate);
submitButton.addEventListener("click", submitBtnClick);

// genera el captcha cuando se carga la pagina
generateCaptcha();
