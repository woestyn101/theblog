console.log("connected");

var updateForm = document.querySelector('.update-post');
console.log(updateForm);
// const update_title = document.querySelector('#update_title');
// const update_post = document.querySelector('#update_yourpost').value;

// update_title.value = "title";
// update_post.value = "content";

var mytitle = document.getElementById("update_title").value = "marius";




const updateFormHandler = async (event) => {
  console.log(event.target);
    event.preventDefault();

    if (event.target.hasAttribute('data-id')) {
    
      const id = event.target.getAttribute('data-id');

      const update_title = document.querySelector('#update_title').value.trim();
    const update_post = document.querySelector('#update_yourpost').value.trim();
  
      const response = await fetch(`/api/blogpost/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ update_title, update_post }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert('Failed to delete project');
      }
    }
  };

updateForm.addEventListener('submit', updateFormHandler);