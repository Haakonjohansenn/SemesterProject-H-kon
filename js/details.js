const postContainer = document.querySelector(".details-container");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const url = "https://cms-course-assignment.flywheelsites.com/wp-json/wp/v2/posts/" + id;

async function fetchPost() {
  try {
    const detailsResponse = await fetch(url);
    const detailsResult = await detailsResponse.json();

    newHtml(detailsResult);
  } catch (e) {
    console.log(e);
  }
};

fetchPost();

function newHtml(detailsResult) {
  postContainer.innerHTML = `<div class="parent-container">
                             <div class="post-text">
                             <h2>${detailsResult.title.rendered}</h2>
                             <p>${detailsResult.content.rendered}</p>
                             </div>
                             </div>`;
};