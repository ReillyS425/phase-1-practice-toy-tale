let addToy = false;
function addNewToyToDOM(toy) {
  const toyCollection = document.querySelector(`#toy-collection`)
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
    //Card INFO
    const toyName = document.createElement("h2");
    toyName.innerText = toy.name;
    cardDiv.appendChild(toyName);

    const img = document.createElement("img");
    img.src = toy.image;
    img.classList.add("toy-avatar");
    cardDiv.appendChild(img);

    const likes = document.createElement("p");
    likes.innerText = `${toy.likes} Likes` ;
    
    cardDiv.appendChild(likes);
 

    const likeBtn = document.createElement("button");
    likeBtn.classList.add("like-btn");
    likeBtn.id = toy.id;
    likeBtn.innerText = "Like ❤️"
    likeBtn.addEventListener("click", (event) => {
      event.preventDefault();
      updateLikes(toy);
    
     
      
    });
    cardDiv.appendChild(likeBtn);

  toyCollection.appendChild(cardDiv);
  function updateLikes(toy) {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({likes: toy.likes + 1})
    })
  .then(res => res.json())
  .then(updatedToy => {
    const pElem = document.getElementById('toy-collection');
   
   likes.innerText = `${updatedToy.likes} Likes`;
    console.log(updatedToy);
  })
  .catch(error => console.log('Error updating likes', error));
  };

}
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


function getToys() {
  fetch(`http://localhost:3000/toys`)
  .then(resp => resp.json())
  .then(toys => { 
    toys.forEach(toy => {
      addNewToyToDOM(toy)
    });
  })
  .catch(error => console.log("Error Fetching Toys"));
}


getToys();



});




const toyForm = document.querySelector('.add-toy-form');
toyForm.addEventListener('submit', function(e) {
  e.preventDefault();
  e.stopPropagation();

    const nameInput = document.querySelector('input[name="name"]');
    const imgInput = document.querySelector('input[name="image"]');
    const name = nameInput.value;
    const image = imgInput.value;

    const newToy = {
      name: name,
      image: image,
      likes: 0
    };
    addingToy(newToy);
});

function addingToy(toy) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(resp => resp.json())
  .then(newToy => {
    addNewToyToDOM(newToy);
  })
  .catch(error => console.log('Error Adding Toy', error));
}

