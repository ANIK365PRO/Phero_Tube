function loadCategories() {
  //* fetch the data
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    //* convert promise to json
    .then(response => response.json())

    //* send data to display
    .then(data => displayCategories(data.categories));
}

function loadVideos() {
  //* fetch the videos
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    //* convert promise to json
    .then(response => response.json())

    //* send data to display
    .then(data => displayVideo(data.videos));
}

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
    <button class="btn btn-sm text-lg hover:bg-[#FF1F3D] hover:text-white hover:font-bold">${cat.category}</button>
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

  //* loop operation on Array of object
  videos.forEach(video => {
    //create element
    const div = document.createElement('div');
    div.innerHTML = ` 
    <div class="card bg-base-100 ">
      <figure class="relative">
        <img class="w-full h-[200px] object-cover" src="${video.thumbnail}" alt="Shoes" />

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
          <p class="text-sm font-medium text-gray-500 flex gap-1">${video.authors[0].profile_name} <img class="w-5 h-5"
              src="https://img.icons8.com/?size=48&id=HxdvwPmtGaQL&format=gif" alt=""></p>
          <p class="text-sm font-medium text-gray-400">${video.others.views} views</p>
        </div>
      </div>
    </div>


    `;

    // append video
    videoContainer.append(div);
  });
};

loadCategories();
