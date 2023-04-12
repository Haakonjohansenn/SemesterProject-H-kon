const resultsContainer = document.querySelector(".results-container");

const url = "http://cms-course-assignment.local/wp-json/wp/v2/posts";

async function fetchPosts() {
  try {

    const response = await fetch(url);
  
    const jsonResult = await response.json();
  
    console.log(jsonResult);
  
    resultsContainer.innerHTML = "";
  
    const posts = jsonResult;

    posts.forEach(function(post){
      resultsContainer.innerHTML += `<a>
                                     <div class="post-text">
                                     <h2>${post.title}</h2>
                                     <h2>${post.content}</h2>
                                     </div>
                                     </a>`;
    });
    console.log(resultsContainer);
  } catch (e){
    console.log(e);
  };
};

fetchPosts();