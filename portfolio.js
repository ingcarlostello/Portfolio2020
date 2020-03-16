const navbar = document.getElementById("navbar")
const containerAbout = document.getElementById("containerAbout")
const iconsExpertise = document.querySelectorAll('.icon')
const card = document.querySelectorAll(".card")

//* Muuri Framework: use to animate the portfolio section
const grid = new Muuri('.grid', {
  layout: {
    rounding: false
  }
});

//calculate the age
let age = () => {
  let currentYear = new Date();
  let birth = 1986;
  document.getElementById("age").innerHTML = currentYear.getFullYear() - birth;
}
age();

//--------------------------------------------------------------------------------------------------------------------------------------------
//NavBar
//--------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("navbar").style.visibility = "hidden";
  containerAbout.style.visibility = "hidden";
  for (let x of iconsExpertise) x.style.visibility = "hidden"

  for (let cards of card) cards.style.visibility = "hidden";

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

//TODO: Function that animated the navbar (fadeIn and FadeOut)
window.onscroll = function () {
  if (document.body.scrollTop == 1 || document.documentElement.scrollTop == 0) {
    navbar.classList.remove('animated', 'fadeIn')
    navbar.classList.add('animated', 'fadeOut')
  }
  else if (document.body.scrollTop >= 500 || document.documentElement.scrollTop >= 500) {
    document.getElementById("navbar").style.visibility = "initial";
    navbar.classList.remove('animated', 'fadeOut')
    navbar.classList.add('animated', 'fadeIn')
  }
  sectionAboutMe()
  animateCards()
  animateIconsExpertise()
}

//--------------------------------------------------------------------------------------------------------------------------------------------
//Hero/Home Section
//--------------------------------------------------------------------------------------------------------------------------------------------
//TODO: properties of ripples js plugin (water effect)
$('.hero').ripples({
  resolution: 600,
  dropRadius: 10,
  perturbance: 0.01
});

//--------------------------------------------------------------------------------------------------------------------------------------------
//About Me Section
//--------------------------------------------------------------------------------------------------------------------------------------------

//TODO: Function that animated the About Me Section
function sectionAboutMe() {
  if (document.body.scrollTop == 1 || document.documentElement.scrollTop == 0) {
    containerAbout.classList.remove('animated', 'fadeInUp')
    containerAbout.classList.add('animated', 'fadeOutDown')
  }
  else if (document.body.scrollTop >= 300 || document.documentElement.scrollTop >= 300) {
    document.getElementById("containerAbout").style.visibility = "initial";
    containerAbout.classList.remove('animated', 'fadeOutDown')
    containerAbout.classList.add('animated', 'fadeInUp')
    containerAbout.style.transform = "translateY(-50%)"
  }
}

//TODO: Function that animated the icons on Coding Skills card
function animateIconsExpertise() {
  let x
  if (document.body.scrollTop == 1 || document.documentElement.scrollTop == 0) {
    for (x of iconsExpertise)
      x.style.visibility = "hidden";
    x.classList.remove('animated', 'fadeIn');
  }
  else if (document.body.scrollTop >= 1200 || document.documentElement.scrollTop >= 1200) {
    let i = 0;
    let interval = setInterval(() => {
      if (i === iconsExpertise.length) {
        clearInterval(interval);
      }
      else {
        iconsExpertise[i].style.visibility = 'initial';
        iconsExpertise[i++].classList.add('animated', 'fadeIn');
      }

    }, 150);

  }
}

//TODO: Function that animated the cards on Expertise Section
function animateCards() {
  let cards
  if (document.body.scrollTop == 1 || document.documentElement.scrollTop == 0) {
    for (cards of card)
      cards.style.visibility = "hidden";
    cards.classList.remove('animated', 'fadeIn');
  }
  else if (document.body.scrollTop >= 700 || document.documentElement.scrollTop >= 700) {
    let i = 0;
    let interval = setInterval(() => {
      if (i === card.length) {
        clearInterval(interval);
      }
      else {
        card[i].style.visibility = 'visible';
        card[i++].classList.add('animated', 'fadeIn');
      }

    }, 150);

  }
}


//TODO: event that animate the portfolio section
window.addEventListener("load", () => {
  grid.refreshItems().layout(); // allow elements fit responsively
  document.getElementById('grid').classList.add('imagenes-cargadas')

  const enlaces = document.querySelectorAll('#categories a');
  enlaces.forEach((elemento) => {   
    elemento.addEventListener('click', (evento) => {
      evento.preventDefault();     
      enlaces.forEach((enlace) => enlace.classList.remove('activo'));
      evento.target.classList.add('activo');
      const categoria = evento.target.innerHTML.toLowerCase();
      console.log(categoria);
      categoria === 'all' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria = "${categoria}"]`);
    });
  });
})



/*----------------------------------------------------------------------------------------------------------------------------------------------
				                                                    Form Validation
-----------------------------------------------------------------------------------------------------------------------------------------------*/
const name = document.getElementById('form_name');
const email = document.getElementById('form_email');
const subject = document.getElementById('form_subject');
const message = document.getElementById('form_message');
const btnSend = document.getElementById('btnForm');
const form = document.getElementById('contact-form')


//--------------------------------------- Disable send Button----------------------------------------------------------------------
eventListeners();

function eventListeners() {
  document.addEventListener('DOMContentLoaded', startApp)
  name.addEventListener('blur', validateField);
  email.addEventListener('blur', validateField);
  subject.addEventListener('blur', validateField);
  message.addEventListener('blur', validateField);
}
function startApp() {
  btnSend.disabled = true;
}

//--------------------------------------- --------------Validate Fields----------------------------------------------------------------------
function validateField() {
  validateLenght(this)

  if (this.type === 'email') {
    validateEmail(this);
  }

  let errores = document.querySelectorAll('.error')
  if (name.value !== "" && email.value !== "" && subject.value !== "" && message.value !== "") {
    if (errores.length === 0) {
      btnSend.disabled = false;
    }
  }
}

function validateLenght(campo) {
  if (campo.value.length > 0) {
    campo.style.borderBottomColor = 'green';
    campo.classList.remove('error');
  }
  else {
    campo.style.borderBottomColor = 'red';
    campo.classList.add('error');
  }
}

function validateEmail(campo) {
  const mensaje = campo.value
  if (mensaje.indexOf('@') !== -1) {
    campo.style.borderBottomColor = 'green';
    campo.classList.remove('error');
  }
  else {
    campo.style.borderBottomColor = 'red';
    campo.classList.add('error');
  }
}

/*----------------------------------------------------------------------------------------------------------------------------------------------
                                                          Get the year
-----------------------------------------------------------------------------------------------------------------------------------------------*/
let ano = new Date();
document.getElementById("year").innerHTML = ano.getFullYear();


