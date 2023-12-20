const query = new URLSearchParams(window.location.search);
const catId = query.get("id");
const API = "products.json";

async function getProductsByCategory(API) {
  try {
    const response = await fetch(API);
    const data = await response.json();
    const { products } = data;

    //Filter them
    const filteredProducts = products.filter(
      (product) => product.cat_id == catId
    );
    renderProducts(filteredProducts);
  } catch (error) {
    console.log(error);
  }
}

function renderProducts(products) {
  const productContainer = document.querySelector("#categoryContainer");
  productContainer.innerHTML = "";
  products.forEach((product) => {
    const productHtml = `
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
    productContainer.insertAdjacentHTML("afterbegin", productHtml);
  });
}
getProductsByCategory(API);
