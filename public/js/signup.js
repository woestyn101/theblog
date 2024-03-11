// getting variable from signup page

var signUpForm = document.querySelector('.signup-user');

// function to handle the form submit
const signupFormHandler = async (event) => {
    event.preventDefault();

    // setting variables from form
  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) { // response.ok will equate to 200
      document.location.replace('/dashboard');
     console.log("ok");
      } else {
        response.json().then(err=>{
          alert(err.message)
        });
      }
    }
  };

  signUpForm.addEventListener('submit', signupFormHandler);