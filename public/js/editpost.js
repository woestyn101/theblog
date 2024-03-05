var updateForm = document.querySelector('.update-user');

const editButtonHandler = async (event) => {

    event.preventDefault();

    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

      const update_title = document.querySelector('#update_title').value.trim();
    const update_post = document.querySelector('#update_yourpost').value.trim();
  
    //   const response = await fetch(`/api/blogpost/${id}`, {
    //     method: 'DELETE',
    //   });
  
      if (response.ok) {
        document.location.replace(`/api/blogpost/update/${id}`);
      } else {
        alert('Failed to delete project');
      }
    }
  };

updateForm.addEventListener('submit', updateFormHandler);