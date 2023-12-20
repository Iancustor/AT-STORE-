const storedCartItems = JSON.parse(localStorage.getItem("cart"));
// console.log(storedCartItems);

let cartItems = storedCartItems ? storedCartItems : [];
// console.log(cartItems);

const cartCount = document.querySelector(".allCartItems");
// console.log(cartNo);

cartCount.textContent = cartItems.length;

const cartContainer = document.querySelector("#cartContainer");
function renderCartItems(cartItems) {
  cartItems.forEach((cartItem) => {
    const CartHtml = `
   <div class="cart">
    <div class="imgcontainer"> 
      <img src="${cartItem.thumbnail}" alt="">
    </div>
    <div class="description">
    <h2 class="cartName text-slate-900 text-2xl font-extrabold">  ${cartItem.title}</h2>
    <p class="cartrPrice text-slate-900 text-2xl font-extrabold">$${cartItem.price}</p>

    </div>
    <button  class="deleteBtn" >
      <i data-id=${cartItem.id}  class='bx bxs-x-circle text-red-600 hover:text-red-800'>

      </i></button>
  </div>
`;
    cartContainer.insertAdjacentHTML("beforeend", CartHtml);
  });
}

renderCartItems(cartItems);

const deleteBtns = document.querySelectorAll(".deleteBtn");
// console.log(deleteBtns);
deleteBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    // console.log("btn clicked");

    // getting the cart id
    const cartId = event.target.dataset.id;

    // using the findindex Method to find the product index
    const cartIndex = cartItems.findIndex((cartItem) => cartItem.id == cartId);
    // console.log(cartIndex);

    // removing the Cart Item
    cartItems.splice(cartIndex, 1);
    // checking the items in the console
    // console.log(cartItems);

    // updating the local storage
    localStorage.setItem("cart", JSON.stringify(cartItems));
    // updating the UI

    cartContainer.innerHTML = cartItems.length;
    cartCount.textContent = cartItems.length;
    showNotification("product deleted");
  });
});

const note = document.querySelector(".note");
function showNotification(message) {
  note.textContent = message;
  note.style.left = "70px";
  setTimeout(() => {
    note.style.left = "-600px";
  }, 3000);
}
