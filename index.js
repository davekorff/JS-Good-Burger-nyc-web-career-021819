document.addEventListener("DOMContentLoaded", () => {

  // application state
  let burgerArr = []


  // fetches:

  // initial fetch and render
  fetch('http://localhost:3000/burgers')
    .then(r => r.json())
    .then(burgerData => {
      burgerArr = burgerData
      renderAllBurgers()
    })

  // create new burger, update db and application state, and re-render all the burgers
  function createBurger(name, desc, img) {
    fetch('http://localhost:3000/burgers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: desc,
        image: img
      })
    })
    .then(res => res.json())
    .then(newBurgerData => {
      burgerArr.push(newBurgerData)
      renderAllBurgers()
    })
  }

  // DOM elements:
  const burgerMenuDiv = document.getElementById('burger-menu')
  const orderListUl = document.getElementById('order-list')
  const customDiv = document.querySelector('.custom')


  // render all burgers and attach them to the DOM
  function renderAllBurgers() {
    burgerMenuDiv.innerHTML = ''
    burgerArr.forEach(burger => {
      burgerMenuDiv.innerHTML += renderBurger(burger)
    })
  }


  // render a single burger menu item
  function renderBurger(burger) {
    return `
      <div class="burger">
      <h3 class="burger_title">${burger.name}</h3>
        <img src="${burger.image}">
        <p class="burger_description">
          ${burger.description}
        </p>
        <button class="button">Add to Order</button>
      </div>
    `
  }


  // event listeners:

  // user clicks on 'add to order' button
  burgerMenuDiv.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON' && e.target.innerText === 'Add to Order') {
      let burgerName = e.target.parentNode.querySelector('.burger_title').innerText
      let newItem = document.createElement('li')
      newItem.innerText = burgerName
      orderListUl.appendChild(newItem)
    }
  })

  // user clicks 'submit order' button on custom burger form
  customDiv.addEventListener('submit', e => {
    e.preventDefault()
    let newBurgerName = document.getElementById('burger-name').value
    let newBurgerDesc = document.getElementById('burger-description').value
    let newBurgerImg = document.getElementById('burger-image').value
    createBurger(newBurgerName, newBurgerDesc, newBurgerImg)
    document.getElementById('burger-name').value = ''
    document.getElementById('burger-description').value = ''
    document.getElementById('burger-image').value = ''
    let newItem = document.createElement('li')
    newItem.innerText = newBurgerName
    orderListUl.appendChild(newItem)
  })


})
