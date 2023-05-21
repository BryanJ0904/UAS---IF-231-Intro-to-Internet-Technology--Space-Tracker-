import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './sidebar.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const navbuttons = document.querySelectorAll("#nav-button");
let navCurrStr = sessionStorage.getItem("navCurrStr");

for (let i = 0; i < navbuttons.length; i++) {
  navbuttons[i].addEventListener("click", function() {
    sessionStorage.setItem("navCurrStr", i)
  });  
}

if (navCurrStr != 0) {
  let navCurr = parseInt(navCurrStr);
  let current = document.getElementsByClassName("active");
  if (current.length > 0) { 
    current[0].className = current[0].className.replace("active", "");
  }
  navbuttons[navCurr].className += " active";
}
else{
  if(navbuttons[0].classList.contains("active")==0){
    navbuttons[0].className += " active";
  }
}

const togglers = document.querySelectorAll(".navbar-toggler");
const navbox = document.querySelector(".navbox");

togglers.forEach(function(toggler) {
  toggler.onclick = function() {
    navbox.classList.toggle("activated");
    navbox.classList.toggle("disabled");
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
