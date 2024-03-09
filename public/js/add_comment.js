console.log("connected");

var commentForm = document.querySelector('.comment-user');
console.log(commentForm);

var blogpostID = document.getElementById("getBpId");
// const update_title = document.querySelector('#update_title');
// const update_post = document.querySelector('#update_yourpost').value;

// update_title.value = "title";
// update_post.value = "content";

// var mytitle = document.getElementById("update_title").value = "marius";




const commentFormHandler = async (event) => {
  console.log(event.target);
    event.preventDefault();
   
    
      const bp_id = getBpId.getAttribute('data-id');

      const yourcomment = document.querySelector('#yourcomment').value.trim();
    
      
      if (yourcomment) {
        const response = await fetch('/api/comment', {
          method: 'POST',
          body: JSON.stringify({ yourcomment, bp_id }),
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

commentForm.addEventListener('submit', commentFormHandler);


