// getting variable for form

var signInForm = document.querySelector('.signin-user');

// function to handle form submit
const signInFormHandler = async (event) => {
    event.preventDefault();

    
    /// setting variables from form submit
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

  
    if (username && password) {
      const response = await fetch('/api/users/signin', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
      document.location.replace('/dashboard');
     console.log("ok");
      } else {
        alert(response.statusText);
        console.log("error");
      }
    }
  };

  signInForm.addEventListener('submit', signInFormHandler);