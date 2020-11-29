const url = `http://localhost:3000/pups`
const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const button = document.createElement('button')
button.className = 'toggle-dog-status'

function renderDog(dog) {

  // for each dog create a span with Doggo name
  dog.forEach(dog => {
    const dogSpan = document.createElement('span')
    dogSpan.className = 'dog-name'
    dogSpan.dataset.id = dog.id
    dogSpan.textContent = dog.name
    dogBar.append(dogSpan)
  })
}

dogBar.addEventListener('click', event => {
  // console.log(event.target)
  const id = event.target.dataset.id
  console.log(id);
  button.dataset.id = id
  // console.log(button);
  
  fetch(`${url}/${id}`)
  .then(r => r.json())
  .then(data => {
    dogInfo.textContent = ''
    // console.log(data);
    const img = document.createElement('img')
    const h2 = document.createElement('h2')
    
    img.src = data.image
    // console.log(img);
    h2.textContent = data.name
    if (data.isGoodDog === true) {
      button.textContent = 'Good Dog!'
    } else {
      button.textContent = 'Bad Dog!'
    }

    dogInfo.append(img, h2, button)
  })
})

button.addEventListener('click', event => {
  console.log(event.target);
  let isGood
  const id = event.target.dataset.id


  if (event.target.textContent === "Good Dog!") {
    button.textContent = "Bad Dog!"
    isGood = false
  } else {
    button.textContent = 'Good Dog!'
    isGood = true
  }


  const dogConfig = {
    isGoodDog: isGood
  }

  fetch(`${url}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(dogConfig)
  })
  .then(r => r.json())

  console.log(event.target.value);
})



function getDogs() {
  fetch(url)
  .then(r => r.json())
  .then(dog => renderDog(dog))
}

getDogs()