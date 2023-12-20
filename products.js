// import api from "./data.json";
//Data-Fetching
const productsContainer = document.querySelector("#productsContainer");
// console.log(productsContainer);

productsContainer.innerHTML = ``;
const API = "data.json";
async function fetchData(api) {
  try {
    const response = await fetch(API);
    const data = await response.json();
    const { products } = data;
    // console.log(products);
    renderProducts(products);
  } catch (error) {
    console.log(error);
  }
}
fetchData(API);
function renderProducts(products) {
  products.forEach((product) => {
    const productHTML = `
    <div class="product grid">
    <div
      class="bg-slate-900 w-[11rem] h-[20rem] lg:w-[18rem] lg:h-[23rem] rounded-2xl grid"
    >
      <a
        href="/product.html?id=${product.id}&&category=${product.category}&&cat_id=${product.cat_id}"
      >
        <img class="productImage p-8 rounded-t-lg " src="${product.thumbnail}"
        alt="product image"/>
      </a>
      <div class="px-5 pb-5">
        <a href="#">
          <h5
            class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            ${product.title}
          </h5>
        </a>
        <div class="flex gap-10 items-center mt-2.5 mb-5">
          <div class="flex items-center space-x-1 rtl:space-x-reverse">
            <i class="bx bxs-star text-yellow-300"></i>
            <i class="bx bxs-star text-yellow-300"></i>
            <i class="bx bxs-star text-yellow-300"></i>
            <i class="bx bxs-star text-yellow-300"></i>
            <i class="bx bxs-star text-gray-300"></i>
          </div>
          <h5 class="OriginalPrice text-slate-50 font-bold">
            ${product.category}
          </h5>
        </div>
        <div class="flex items-center justify-between">
          <span
            class="lg:text-3xl font-bold text-gray-900 dark:text-white"
            >$${product.price}</span
          >
          <button
            data-id="${product.id}"
            class="add-to-cart text-white bg-blue-700 hover:bg-blue-800 sm:font-normal sm:p-1 lg:font-medium rounded-lg text-sm lg:px-5 lg:py-2.5 px-1.5 py-[.3rem] text-center"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
    productsContainer.insertAdjacentHTML("beforeend", productHTML);
  });
  // ADD TO CART
  const cartBtns = document.querySelectorAll(".add-to-cart");
  // console.log(cartBtns);
  const cartContainer = document.querySelector(".cart");
  // console.log(cartContainer);

  // stored cart item
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  let cart = storedCart ? storedCart : [];
  console.log(storedCart);
  cartContainer.textContent = cart.length;
  //For Each & eventlistener on cartbtn
  cartBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const productId = event.target.dataset.id;
      // console.log(productId);
      showNotification(`product added to cart`);
      // finding cart product
      const cartProduct = products.find((product) => {
        return product.id == productId;
      });
      cart.push(cartProduct);
      cartContainer.textContent = cart.length;
      console.log(cart);

      // local storage with Cart
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(JSON.stringify(cart));
    });
  });
}
//MESSAGE
const note = document.querySelector(".note");
// console.log(note);
function showNotification(message) {
  note.textContent = message;
  note.style.left = "70px";
  setTimeout(() => {
    note.style.left = "-600px";
  }, 3000);
}
