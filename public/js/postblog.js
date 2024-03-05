// getting variables from form

var postForm = document.querySelector('.post-user');
var deleteButton = document.querySelector('#delBtn');
var editButton = document.querySelector('#editBtn');

// function to hangle form submit
const postFormHandler = async (event) => {
    event.preventDefault();

    
   // getting variables from form
    const title = document.querySelector('#title').value.trim();
    const userPost = document.querySelector('#yourpost').value.trim();

  
    if (title && userPost) {
      const response = await fetch('/api/blogpost', {
        method: 'POST',
        body: JSON.stringify({ title, userPost }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
      document.location.replace('/');
     console.log("ok");
      } else {
        alert(response.statusText);
        console.log("error");
      }
    }
  };

  // calling the funtion when button is pressed
  postForm.addEventListener('submit', postFormHandler);


  // delete function

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blogpost/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete project');
      }
    }
  };

  // calling the delete function when button is pressed
  
  deleteButton.addEventListener('click', delButtonHandler);

// edit function
  const editButtonHandler = async (event) => {

    document.location.replace('update');
    
  };

  // calling the edit function

  editButton.addEventListener('click', editButtonHandler);