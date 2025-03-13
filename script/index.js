function loadCategories() {
  //* fetch the data
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    //* convert promise to json
    .then(response => response.json())

    //* send data to display
    .then(data => displayCategories(data.categories));
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
    console.log(cat);
    //* create Element
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
    <button class="btn btn-sm text-lg hover:bg-[#FF1F3D] hover:text-white hover:font-bold">${cat.category}</button>
    `;

    //* append Element
    categoriesContainer.appendChild(categoryDiv);
  }
}

loadCategories();
