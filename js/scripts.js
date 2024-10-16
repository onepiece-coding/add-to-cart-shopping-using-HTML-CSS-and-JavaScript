import { 
    
    getAllProducts, addProductToCart,
    
    deleteProductFromCart, updateQuantity

} from "./services.js";

const mainProductsEl = document.querySelector(".main-products");

const openShoppingCartBtnEl = document.querySelector(".open-shopping-cart-btn");

const cartEl = document.querySelector(".cart");

const cartCloseBtnEl = document.querySelector(".cart--close-btn");

const cartItemsEl = document.querySelector(".cart-items");

const quantityEl = document.querySelector(".open-shopping-cart-btn span");

const totalEl = document.getElementById("total");

let ProductsLength = 0;

let allCartItems = [];

function getProducts() {

    getAllProducts("http://localhost:3000/products")

    .then(response => JSON.parse(response))

    .then(products => {

        ProductsLength = products.length;

        products.forEach(product => createProduct(product));

    }).catch(error => console.log(error));

}

getProducts();

function getCartItems() {

    getAllProducts("http://localhost:3000/cart")

    .then(response => JSON.parse(response))

    .then(cartItems => {

        quantityEl.textContent = cartItems.length;

        totalEl.textContent = cartItems.reduce((acc, cur) => {

            return acc + (cur.product_price * cur.quantity);

        }, 0) + " DH";

        allCartItems = cartItems;

        if (cartItems.length > 0) {

            cartItems.forEach(cartItem => createCartItem(cartItem));

        } else {

            cartItemsEl.innerHTML = "<p class=\"empty-cart\">No Items To Show!</p>";

        }

    }).catch(error => console.log(error));

}

getCartItems();

function createProduct({product_image, product_title, product_price}) {

    const mainProductEl = document.createElement("div");

    mainProductEl.className = "main-product";

    const mainProductImgEl = document.createElement("div");

    mainProductImgEl.className = "main-product--img";

    const productImgEl = document.createElement("img");

    productImgEl.src = `/imgs/${product_image}`;

    productImgEl.alt = product_title;

    mainProductImgEl.appendChild(productImgEl);

    mainProductEl.appendChild(mainProductImgEl);

    const mainProductNameEl = document.createElement("h2");

    mainProductNameEl.className = "main-product--name";

    const productTitleText = document.createTextNode(product_title);

    mainProductNameEl.appendChild(productTitleText);

    mainProductEl.appendChild(mainProductNameEl);

    const mainProductPriceEl = document.createElement("p");

    mainProductPriceEl.className = "main-product--price";

    const productPriceText = document.createTextNode(`${product_price} DH`);

    mainProductPriceEl.appendChild(productPriceText);

    mainProductEl.appendChild(mainProductPriceEl);

    const addToCartBtnEl = document.createElement("button");

    addToCartBtnEl.className = "add-to-cart-btn";

    const addToCartBtnText = document.createTextNode("Add To Cart");

    addToCartBtnEl.appendChild(addToCartBtnText);

    addToCartBtnEl.addEventListener("click", () => {

        const findCartItem = allCartItems.find(cartItem => {

            return cartItem.product_title === product_title;

        })

        if (findCartItem) {

            alert("The product you try add it, already exist in your cart!");

        } else {

            addProductToCart("http://localhost:3000/cart", {

                product_image,

                product_title,

                product_price,

                quantity: 1
                
            });

        }

    });

    mainProductEl.appendChild(addToCartBtnEl);
    
    mainProductsEl.appendChild(mainProductEl);

}

function createCartItem({id, product_image, product_title, product_price, quantity}) {

    const cartItemEl = document.createElement("div");

    cartItemEl.className = "cart-item";

    const cartItemDataEl = document.createElement("div");

    cartItemDataEl.className = "cart-item--data";

    const cartItemImgEl = document.createElement("div");

    cartItemImgEl.className = "cart-item--img";

    const cartItemImg = document.createElement("img");

    cartItemImg.src = `/imgs/${product_image}`;

    cartItemImg.alt = product_title;

    cartItemImgEl.appendChild(cartItemImg);

    cartItemDataEl.appendChild(cartItemImgEl);

    const cartItemInfoEl = document.createElement("div");

    cartItemInfoEl.className = "cart-item--info";

    const cartItemTitleEl = document.createElement("h4");

    cartItemTitleEl.className = "cart-item--title";

    cartItemTitleEl.textContent = product_title;

    cartItemInfoEl.appendChild(cartItemTitleEl);

    const cartItemPriceEl = document.createElement("p");

    cartItemPriceEl.className = "cart-item--price";

    cartItemPriceEl.textContent = `${product_price} DH`;

    cartItemInfoEl.appendChild(cartItemPriceEl);

    cartItemDataEl.appendChild(cartItemInfoEl);

    cartItemEl.appendChild(cartItemDataEl);

    const cartItemQuantityEl = document.createElement("div");

    cartItemQuantityEl.className = "cart-item--quantity";

    const cartItemIncreaseBtn = document.createElement("button");

    cartItemIncreaseBtn.classList.add("cart-item--increase-btn", "cart-btn");

    cartItemIncreaseBtn.textContent = "+";

    cartItemQuantityEl.appendChild(cartItemIncreaseBtn);

    const cartItemQuantityValueEl = document.createElement("div");

    cartItemQuantityValueEl.className = "cart-item--quantity-value";

    cartItemQuantityValueEl.textContent = quantity;

    cartItemQuantityEl.appendChild(cartItemQuantityValueEl);

    const cartItemDecreaseBtn = document.createElement("button");

    cartItemDecreaseBtn.classList.add("cart-item--decrease-btn", "cart-btn");

    cartItemDecreaseBtn.textContent = "-";

    cartItemQuantityEl.appendChild(cartItemDecreaseBtn);

    cartItemIncreaseBtn.addEventListener("click", function () {

        if (+cartItemQuantityValueEl.textContent < ProductsLength) {

            cartItemQuantityValueEl.textContent = quantity;

            cartItemPriceEl.textContent = (product_price * quantity) + " DH";

            updateQuantity(`http://localhost:3000/cart/${id}`, {quantity: quantity + 1});

        } else {

            this.style["pointer-events"] = "fill";

            this.style.cursor = "not-allowed";

        }

    });

    cartItemDecreaseBtn.addEventListener("click", () => {

        if (+cartItemQuantityValueEl.textContent > 1) {

            cartItemQuantityValueEl.textContent = quantity;

            cartItemPriceEl.textContent = (product_price * quantity) + " DH";

            updateQuantity(`http://localhost:3000/cart/${id}`, {quantity: quantity - 1});

            cartItemIncreaseBtn.style["pointer-events"] = "auto";

            cartItemIncreaseBtn.style.cursor = "pointer";

        } else {

            deleteProductFromCart(`http://localhost:3000/cart/${id}`);

        }

    });

    cartItemEl.appendChild(cartItemQuantityEl);

    const cartItemDeleteBtnEl = document.createElement("button");

    cartItemDeleteBtnEl.classList.add("cart-item--delete-btn", "cart-btn");

    cartItemDeleteBtnEl.textContent = "x";

    cartItemDeleteBtnEl.addEventListener("click", () => {

        deleteProductFromCart(`http://localhost:3000/cart/${id}`);

    });

    cartItemEl.appendChild(cartItemDeleteBtnEl);

    cartItemsEl.appendChild(cartItemEl);

}

openShoppingCartBtnEl.addEventListener("click", _ => cartEl.classList.add("show"));

cartCloseBtnEl.addEventListener("click", _ => cartEl.classList.remove("show"));

document.addEventListener("click", (event) => {

    if (

        !cartEl.contains(event.target) &&

        !openShoppingCartBtnEl.contains(event.target)

    ) {

        cartEl.classList.remove("show");

    }

});
