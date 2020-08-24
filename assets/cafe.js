const orderProduct = {
    name: null,
    qty: 0,
    price: 0,
    priceLabel: '',
    imgUrl: null
};

const cart = {
    key: '',
    value: 0
}

function clearCart() {
    cart.key = '';
    cart.value = 0;
}

function getItems(productName, clazz) {
    let qtyAll = document.querySelectorAll("." + productName + "." + clazz);
    var itemsArray = Array.from(qtyAll);
    var qty = itemsArray.filter(v => v.classList.item(0) == productName)[0];
    return qty;
}

function addQty(productName) {
    var qty = getItems(productName, "qty");
    var qtyInt = parseInt(qty.innerText);

    qtyInt += 1;

    console.log(qtyInt);

    qty.innerText = qtyInt;
}

function reduceQty(productName) {
    var qty = getItems(productName, "qty");
    var qtyInt = parseInt(qty.innerText);

    if (qtyInt == 0) {
        qtyInt = 0;
    } else {
        qtyInt -= 1;
    }

    console.log(qtyInt);
    qty.innerText = qtyInt;
}

function addToCart(productName) {
    var qty = getItems(productName, "qty");
    var qtyInt = parseInt(qty.innerText);
    cart.key = productName;
    cart.value = qtyInt;

    if (cart.value !== 0) {
        putCart(cart);
        addCartHtml();
        calculateTotal();
    }

    clearCart();
    qty.innerText = 0;


}

function calculateTotal() {
    let itemsMap = getFromSessionStorage();
    let total = 0;
    itemsMap.forEach((v, k) => {
        let price = getItems(k, "price");
        let priceInt = parseInt(price.innerHTML);
        total += parseInt(v) * priceInt;
    })
    let totalDom = document.getElementById("total");
    totalDom.innerHTML = total;
}

function loadCart() {
    let itemsMap = getFromSessionStorage();
    let container = document.getElementById("cart-container");
    let imgMap = getImgMap();
    itemsMap.forEach((v, k) => {
        let imgName = imgMap.get(k);
        let qtyStored = getCartItem(k);

        let html = '<section id="' + k + '-cart" class="card1">';
        html += `<figure><img class="product" src="./assets/image/${imgName}" alt="${k}" /><br/><figcaption class="${k} caption">${k}</figcaption></figure>`;
        html += '<div><p>Quantity x</p><p class="' + k + ' cartqty">' + qtyStored + '</p><button class="' + k + ' btn delete-btn">delete</button></div></section>';

        container.innerHTML += html;
    });
}

function getImgMap() {
    let imgMap = new Map();
    imgMap.set("burger", "burger.png");
    imgMap.set("coffee", "coffee.png");
    imgMap.set("cola", "cola.png");
    imgMap.set("ice-cream", "ice-cream.png");
    imgMap.set("macaron", "macaron.png");
    imgMap.set("salad", "salad.png");
    return imgMap;
}

function addCartHtml() {
    let container = document.getElementById("cart-container");

    let imgMap = getImgMap();

    let imgName = imgMap.get(cart.key);
    let qtyStored = getCartItem(cart.key);

    let item = getItems(cart.key, "caption");

    console.log("item = ", item);
    if (typeof item == "undefined") {
        console.log("no product {} in cart!", cart.key);

        let html = '<section id="' + cart.key + '-cart" class="card1">';
        html += `<figure><img class="product" src="./assets/image/${imgName}" alt="${cart.key}" /><br/><figcaption class="${cart.key} caption">${cart.key}</figcaption></figure>`;
        html += '<div><p>Quantity x</p><p class="' + cart.key + ' cartqty">' + qtyStored + '</p><button class="' + cart.key + ' btn delete-btn">delete</button></div></section>';

        container.innerHTML += html;

        init();
    } else {
        console.log("adding to existing cart");
        let qtyCart = getItems(cart.key, "cartqty");
        qtyCart.innerHTML = qtyStored;
    }
}

function clearAll() {
    sessionStorage.clear();
    let container = document.getElementById("cart-container");
    container.innerHTML = null;

    let totalDom = document.getElementById("total");
    totalDom.innerHTML = 0;
}

function clearCartItem(productName) {
    sessionStorage.removeItem(productName);

    let container = document.getElementById(productName+"-cart");
    container.innerHTML = null;

    calculateTotal();
    init();   
}



function init() {  
    let buttons = null;
    buttons = document.querySelectorAll(".btn");
    console.log(buttons);
    for(let button of buttons){
        button.removeEventListener('click', onclickbtn);
    }
    for (let button of buttons) {
        button.addEventListener('click', onclickbtn)
    }
}


loadCart();
init();

function onclickbtn (event) {

    // mendapatkan objek elemen yang diklik
    const target = event.target;
    let productName = target.classList.item(0);
    // console.log("productname = "+ productName);

    if (target.classList.contains("plus")) {
        console.log("plus");
        addQty(productName);
    }

    if (target.classList.contains("min")) {
        reduceQty(productName);
    }

    if (target.classList.contains("add-to-cart-btn")) {
        console.log("add");
        addToCart(productName);
    }

    if (target.classList.contains("clear")) {
        clearAll();
    }

    if (target.classList.contains("checkout")) {
        clearAll();
        alert('Successfully buy foods and drinks! Thank you :)');
    }

    if (target.classList.contains("delete-btn")) {
        clearCartItem(productName);
        alert('Cleared ' + productName + '!');
    }
}
//  function renderProducts(){
//         let container = document.querySelector("#order-container");

//         var productList = [
//             {name:"burger", qty:"0", price:"30000", priceLabel:"IDR30K", imgUrl:"assets/image/burger.png"},
//             {name:"coffee", qty:"0", price:"10000", priceLabel:"IDR10K", imgUrl:"assets/image/coffee.png"},
//             {name:"cola", qty:"0", price:"18000", priceLabel:"IDR18K", imgUrl:"assets/image/cola.png"},
//             {name:"ice cream", qty:"0", price:"25000", priceLabel:"IDR25K", imgUrl:"assets/image/ice-cream.png"},
//             {name:"macaron", qty:"0", price:"6000", priceLabel:"IDR6K", imgUrl:"assets/image/macaron.png"},
//             {name:"salad", qty:"0", price:"20000", priceLabel:"IDR20K", imgUrl:"assets/image/salad.png"},
//         ];
//         console.log("prod",window.location.hostname)
//         productList.forEach(p => {       
//             let product = "<section id='" + p.name + "' class='card1'>";
//             product += '<img class="product" src="' + p.imgUrl + '" alt="' + p.name + '"/><br/>';
//             product += '<p>' + p.name + '</p>';
//             product += '<p>' + p.priceLabel + '</p>';
//             product += '<div class="order-button-group">';
//             product += '<button class="' + p.name + ' btn min">- </button>';
//             product += '<p class="' + p.name + ' qty">' + p.qty +'</p>';
//             product += '<p class="' + p.name + ' price" style="display:none">' + p.price + '</p>';
//             product += '<button class="' + p.name + '" btn plus">+</button></div>';
//             product += '<button class="' + p.name + '" btn add-to-cart-btn">Add to Cart</button></section>';

//             container.innerHTML +=product;
//         });
//     }

//     renderProducts();  