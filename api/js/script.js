let navbar = document.querySelector('.header .flex .navbar');
let profile = document.querySelector('.header .flex .profile');

document.querySelector('#menu-btn').onclick = () =>{
   navbar.classList.toggle('active');
   profile.classList.remove('active');
}

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   navbar.classList.remove('active');
}

window.onscroll = () =>{
   profile.classList.remove('active');
   navbar.classList.remove('active');
}

function loader(){
   document.querySelector('.loader').style.display = 'none';
}

function fadeOut(){
  setInterval(loader, 2000);
}

window.onload = fadeOut;


const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Dohvaćanje vrijednosti iz polja obrasca
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const number = document.getElementById("number").value;
  const pass = document.getElementById("pass").value;
  const cpass = document.getElementById("cpass").value;

  const newUser = {
    name: name,
    email: email,
    number: number,
    pass: pass,
    cpass: cpass
  };

  // Slanje podataka na poslužitelj koristeći POST zahtjev
  fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  })
    .then((response) => response.json())
    .then((data) => {
      // Ovdje možete obraditi odgovor s poslužitelja
      console.log(data);
      // Možete prikazati poruku o uspješnoj registraciji ili preusmjeriti korisnika na drugu stranicu
    })
    .catch((error) => {
      console.error("Error:", error);
      // Možete prikazati poruku o pogrešci ili poduzeti odgovarajuće radnje
    });
});
