var postForm = document.querySelector('.post-user');
var deleteButton = document.querySelector('#delBtn');


const postFormHandler = async (event) => {
    event.preventDefault();

    
  
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

  postForm.addEventListener('submit', postFormHandler);

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
  
  deleteButton.addEventListener('click', delButtonHandler);