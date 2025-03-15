const showLoader = () => {
  document.getElementById('loader_box').classList.remove('hidden');
  document.getElementById('videos_container').classList.add('hidden');
};
const hideLoader = () => {
  document.getElementById('loader_box').classList.add('hidden');
  document.getElementById('videos_container').classList.remove('hidden');
};

function loadCategories() {
  //* fetch the data
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    //* convert promise to json
    .then(response => response.json())

    //* send data to display
    .then(data => displayCategories(data.categories));
}

function removeActiveClass() {
  const activeBtn = document.getElementsByClassName('active');

  for (let btn of activeBtn) {
    btn.classList.remove('active');
  }
}

function loadVideos(searchText = '') {
  showLoader();

  //* fetch the videos
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    //* convert promise to json
    .then(response => response.json())

    //* send data to display
    .then(data => {
      removeActiveClass();
      const btn = document.getElementById('btn_all');
      btn.classList.add('active');
      console.log(btn);
      displayVideo(data.videos);
    });
}

function loadCategoryVideos(id) {
  showLoader();

  const url = ` https://openapi.programming-hero.com/api/phero-tube/category/${id}
`;

  fetch(url).then(response =>
    response.json().then(data => {
      removeActiveClass();
      const clickedBtn = document.getElementById(`btn-${id}`);
      clickedBtn.classList.add('active');
      // console.log(clickedBtn);
      displayVideo(data.category);
    })
  );
}

const loadVideoDetails = videoId => {
  // console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then(response => response.json())
    .then(data => displayVideoDetails(data.video));
};

const displayVideoDetails = video => {
  console.log(video);
  document.getElementById('video_details_modal').showModal();

  const detailsContainer = (document.getElementById(
    'details_container'
  ).innerHTML = `

    
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="video-details" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Title: ${video.title}</h2>
    <p>Profile_name: ${video.authors[0].profile_name}</p>
    <p>Posted_date: ${video.others.posted_date}</p>
    <p>description: ${video.description}</p>
    <div class="card-actions justify-end">
  
    </div>
  </div>
  </div>
  
  `);
};

// {
//     "category_id": "1001",
//     "category": "Music"
// }

function displayCategories(categories) {
  // console.log(categories);
  //* get the container
  const categoriesContainer = document.getElementById('categories_container');

  //* loop operation on Array of object
  for (let cat of categories) {
    // console.log(cat);
    //* create Element
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
    <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm text-lg hover:bg-[#FF1F3D] hover:text-white hover:font-bold">${cat.category}</button>
    `;

    //* append Element
    categoriesContainer.appendChild(categoryDiv);
  }
}

// {
// "category_id": "1001",
// "video_id": "aaaa",
// "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
// "title": "Shape of You",
// "authors": [
// {
// "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
// "profile_name": "Olivia Mitchell",
// "verified": ""
// }
// ],
// "others": {
// "views": "100K",
// "posted_date": "16278"
// },
// "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

const displayVideo = videos => {
  // console.log(videos);
  //* get the container
  const videoContainer = document.getElementById('videos_container');
  videoContainer.innerHTML = '';

  if (videos.length == 0) {
    videoContainer.innerHTML = `
    
    <div class="col-span-full flex flex-col justify-center items-center text-center py-20">
      <img class="w-20" src="./assets/Icon.png" alt="">
      <h2 class="text-2xl font-bold">Oops!! Sorry, There is <br> no content here</h2>
    </div>

    `;
    hideLoader();
    return;
  }

  //* loop operation on Array of object
  videos.forEach(video => {
    //create element
    const div = document.createElement('div');
    div.innerHTML = ` 
    <div class="card bg-base-100 ">
      <figure class="relative">
        <img class="w-full h-[200px] object-cover" src="${
          video.thumbnail
        }" alt="Shoes" />

        <span class="absolute bottom-2 right-2 text-sm rounded-lg text-white bg-black p-2">3hrs 56 min ago</span>

      </figure>
      <div class="flex gap-4 px-1 py-5">
        <div id="profile">
          <div class="avatar">
            <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
              <img src="${video.authors[0].profile_picture}" />
            </div>
          </div>
        </div>
        <div id="intro">
          <h2 class="text-sm font-semibold">${video.title} </h2>          

          <p class="text-sm font-medium text-gray-500 flex gap-1">${
            video.authors[0].profile_name
          } 
          <span>${
            video.authors[0].verified == true
              ? `
            <img class="w-5 h-5"
              src="https://img.icons8.com/?size=48&id=HxdvwPmtGaQL&format=gif" alt="">
      
            `
              : ` `
          }</span></p>
          <p class="text-sm font-medium text-gray-400">${
            video.others.views
          } views</p>


        </div>
      </div>

      <button onclick="loadVideoDetails('${
        video.video_id
      }')" class="btn btn-block">Show Details</button>
    </div>
    `;

    // append video
    videoContainer.append(div);
  });

  hideLoader();
};

document.getElementById('search_box').addEventListener('keyup', e => {
  const input = e.target.value;
  loadVideos(input);
});

loadCategories();
