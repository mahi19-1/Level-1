let loadData = () => {
  fetch('https://f24-1-mid-1.vercel.app/content')
    .then(res => res.json())
    .then(data => showData(data))
}

const showData = (values) => {
  const mainDiv = document.getElementById('container');
  const addedCardsDiv = document.getElementById('container-2'); 

 
  mainDiv.classList.add('grid', 'grid-cols-1', 'gap-5'); 

 
  let totalAddedCount = 0; 

 
  const header = document.createElement('div');
  header.classList.add('flex', 'justify-between', 'p-4', 'bg-gray-300', 'rounded-t-xl', 'mb-2'); 
  header.innerHTML = `
      <span class="text-lg font-semibold">${values[0].category}</span> 
      <span class="text-lg font-semibold">Counter: <span id="counter">${totalAddedCount}</span></span>
  `;
  addedCardsDiv.appendChild(header);

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('max-w-3xl', 'mx-auto', 'gap-5', 'grid', 'grid-cols-1'); 
  addedCardsDiv.appendChild(cardsContainer);

  for (const value of values) {
    const { category, author, title, description, comment_count, view_count, image } = value;

    const authorName = author && author.name ? author.name : 'Unknown Author';

    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card bg-base-100 shadow-xl relative rounded-lg">
            <figure class="absolute top-0 left-0 p-4">
                <img class="h-16 w-16 object-cover" src="${image}" alt="" />
            </figure>

            <div class="card-body pl-24 bg-purple-400 rounded-xl">
                <h2 class="card-title">${category} ${authorName}</h2>
                <p>${title}</p>
                <p>${description}</p>
                <p>${comment_count} Comments | ${view_count} Views</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary add-button" data-title="${title}" data-comment-count="${comment_count}">Add</button>
                </div>
            </div>
        </div>
    `;
    mainDiv.appendChild(div);
  }

 
  const addButtons = document.querySelectorAll('.add-button');
  addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const title = e.target.dataset.title;
      const commentCount = e.target.dataset.commentCount;

      
      const addedCardDiv = document.createElement('div');
      addedCardDiv.classList.add('card','shadow-xl', 'relative', 'rounded-lg', 'w-full', 'mb-3', 'mx-auto'); 
      addedCardDiv.innerHTML = `
          <div class="card-body bg-red-200 rounded-xl  ml-3 mr-3 grid grid-cols-2 space-x-32
           ">
              <span class="text-lg font-semibold ">${title}</span>
              <span class="text-lg font-semibold ">${commentCount} Comments</span>
          </div>
      `;

      
      cardsContainer.appendChild(addedCardDiv);

     
      totalAddedCount++;
      document.getElementById('counter').innerText = totalAddedCount;
    });
  });
};

loadData();

  
  // Blog section
  
  
let loadSecondData = () => {
    fetch('https://f24-1-mid-1.vercel.app/blogs')
      .then(res => res.json())
      .then(data => viewData(data))
      .catch(error => {
        loading.error("loading error:", error); 
      });
  }
  
  
  const viewData = (results) => {
    const secondMainDiv = document.getElementById('blog');
    
    if (!secondMainDiv) {
      loading.error("Undefined");
      return;
    }
  
    
    secondMainDiv.innerHTML = '';
  
    if (results.length === 0) {
      secondMainDiv.innerHTML = '<p>Undefined</p>';
      return;
    }
  
   
    results.forEach((result) => {
      const { posted_date, title, description, author, profile_image, cover_image } = result;
      
      
      const authorName = author && author.name ? author.name : 'Unknown Author';
      let authorDesignation = author && author.designation ? author.designation : 'undefined';
  
      
      const divv = document.createElement('div');
      divv.classList.add('card', 'bg-base-100', 'w-96', 'shadow-xl', 'mb-4');
  
      divv.innerHTML = `
        <figure>
          <img src="${cover_image}" alt="Cover Image" class="w-full h-48 object-cover" />
        </figure>
        <div class="p-4">
          <div class="text-gray-500 text-sm mb-2">${posted_date}</div>
          <h2 class="text-xl font-bold mb-2">${title}</h2>
          <p class="text-gray-700 mb-4">${description}</p>
          <div class="flex items-center">
            <img src="${profile_image}" alt="Author Image" class="w-10 h-10 rounded-full mr-3" />
            <div>
              <p class="font-semibold">${authorName}</p>
              <p class="text-gray-500 text-sm">${authorDesignation}</p>
            </div>
          </div>
        </div>
      `;
  
     
      secondMainDiv.appendChild(divv);
    });
  };
  
 
  document.addEventListener('DOMContentLoaded', loadSecondData);
  