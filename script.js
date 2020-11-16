console.log('Its working')

let theme = localStorage.getItem('theme')

if(theme == null){
	setTheme('light')
}else{
	setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dot')


for (var i=0; themeDots.length > i; i++){
	themeDots[i].addEventListener('click', function(){
		let mode = this.dataset.mode
		console.log('Option clicked:', mode)
		setTheme(mode)
	})
}

function setTheme(mode){
	if(mode == 'light'){
		document.getElementById('theme-style').href = 'default.css'
	}

	if(mode == 'blue'){
		document.getElementById('theme-style').href = 'blue.css'
	}

	if(mode == 'green'){
		document.getElementById('theme-style').href = 'green.css'
	}

	if(mode == 'purple'){
		document.getElementById('theme-style').href = 'purple.css'
	}

	localStorage.setItem('theme', mode)
}

/* pierw tworze timeline to zmian wielu animacji naraz */ 

const tl = gsap.timeline({defaults: {ease: "power1.out"}})

tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
tl.to(".slider", {y: "-100%", duration:1.5, delay: 0.5 });  /* gsap pozwala zeby nastepna animacja byla chained zaraz po 1*/
tl.to(".intro", {y: "-100%", duration: 1}, "-=1");            /* -=1 znaczy zacznij 1 sec faster*/
tl.fromTo(".nav-wrapper", {opacity: 0}, {opacity: 1, duration: 1.5});            /* fromTo znaczy starting point i ENDpoint po przecinku*/
tl.fromTo(".greeting-wrapper", {opacity: 0}, {opacity: 1, duration: 3}, "-=1");  /* .big-text is a class*/

/* akcja dla guzika i contact form ze strony formspree spox zakladki ajax*/

window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above
    
    var form = document.getElementById("my-form");
    //var button = document.getElementById("my-form-button");
    var status = document.getElementById("status");

    // Success and Error functions for after the form is submitted
    
    function success() {
      form.reset();
      
      status.innerHTML = "thanks, your message has been send.";
    }

    function error() {
      status.innerHTML = "Oops! There was a problem.";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });
  
  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }