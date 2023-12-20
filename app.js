// import api from "./data.json";
//CATEGORIES
const categoryContainer = document.querySelector(".catiesContainer");
console.log(categoryContainer);

const catAPI = "categories.json";

async function fetchCategories(catAPI) {
  try {
    const response = await fetch(catAPI);
    const categories = await response.json();

    //Call a function to render the data
    renderCategories(categories);
  } catch (error) {
    console.log(error);
  }
}

function renderCategories(categories) {
  categoryContainer.innerHTML = "";
  categories.forEach((category) => {
    const categoryHtml = `
<a href="/category.html?id=${category.id}" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-900 dark:bg-gray-900 dark:hover:bg-black">
<img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="${category.image}"
alt="${category.title}">
<div class="flex flex-col justify-between p-4 leading-normal">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${category.title}</h5>
    <p class="mb-3 font-normal text-gray-700  dark:text-gray-400">${category.description}</p>
</div>
</a>
  `;
    categoryContainer.insertAdjacentHTML("afterbegin", categoryHtml);
  });
}

fetchCategories(catAPI);

// recommended
const recommendedProducts = document.querySelector("#recommendedContainer");
// console.log(recommendedProducts);
recommendedProducts.innerHTML = ``;

const API = "data.json";
async function fetchData(API) {
  try {
    const response = await fetch(API);
    const data = await response.json();
    const { products } = data;
    const recommendedPdts = products.splice(2, 4);
    // console.log(recommendedPdts);
    renderProducts(recommendedPdts);
  } catch (error) {
    console.log(error);
  }
}
fetchData(API);
function renderProducts(recommendedPdts) {
  recommendedPdts.forEach((product) => {
    const productHTML = `
    <div class="product grid">
    <div
      class="bg-slate-900 w-[11rem] h-[20rem] lg:w-[18rem] lg:h-[23rem] rounded-2xl "
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
    recommendedProducts.insertAdjacentHTML("beforeend", productHTML);
  });
}
