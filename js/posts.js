const resultsContainer = document.querySelector(".results-container");

const url = "https://cms-course-assignment.local/wp-json/wp/v2/posts";

async function fetchPosts() {
  try {

    for (let i = 0; i < 100; i++) {
      resultsContainer.innerHTML += `<div class="skeleton loader skeleton-card">
                                     <div class="skeleton-loader skeleton-image" src=""></div>
                                     </div>`;
    }

    const response = await fetch(url);
  
    const jsonResult = await response.json();
  
    resultsContainer.innerHTML = "";
  
    const posts = jsonResult;

    console.log(jsonResult);

    posts.forEach(function(post){
      resultsContainer.innerHTML += `
                                     <div class="parent-container">
                                     <div class="card-container">
                                     <div class="post-title">
                                     <h2>${post.title.rendered}</h2>
                                     <p>${post.excerpt.rendered}</p>
                                     <a href="/app/details.html?id=${post.id}"><button>Read more</button></a>
                                     </div>
                                     </div>
                                     </div>`;
    });
    console.log(resultsContainer);
  } catch (e){
    console.log(e);
  };
};

fetchPosts();