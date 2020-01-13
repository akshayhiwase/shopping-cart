var orderTotal = JSON.parse(localStorage.getItem("orderTotal"));
var orderData = JSON.parse(localStorage.getItem("orderData"));
const checkoutContainer = document.getElementById("checkout-container")
const checkoutSectionContainer = document.getElementById("checkout-section-container")
var cartCount = document.getElementById("cart-count")
var totalCart = JSON.parse(localStorage.getItem("orderTotal"));
cartCount.innerHTML = totalCart === null ? "0" : totalCart.totalOrderQuantity;
var orderPlace = {
    ItemId: orderData,
    itemAmount: orderTotal,
};

function createCheckoutSection(data) {
    const checkoutSection = document.createElement("div")
    checkoutSection.className = "checkout-section"
    checkoutSection.id = "checkout-id"
    const checkoutImageSection = document.createElement("div")
    checkoutImageSection.className = "checkout-image-section"
    checkoutSection.appendChild(checkoutImageSection)
    const checkoutImage = document.createElement("img")
    checkoutImage.className = "checkout-image"
    checkoutImage.src = data.preview
    checkoutImageSection.appendChild(checkoutImage)
    const checkoutDetailsSetion = document.createElement("div")
    checkoutDetailsSetion.className = "checkout-details-section"
    checkoutSection.appendChild(checkoutDetailsSetion)
    const checkoutItemName = document.createElement("h6")
    checkoutItemName.className = "checkout-item-name"
    checkoutItemName.innerHTML = data.name
    checkoutDetailsSetion.appendChild(checkoutItemName)
    const checkoutItemQuantity = document.createElement("p")
    checkoutItemQuantity.className = "checkout-item-quantity"
    checkoutItemQuantity.innerHTML = "x" + data.quantity
    checkoutDetailsSetion.appendChild(checkoutItemQuantity)
    const checkoutItemPrice = document.createElement("p")
    checkoutItemPrice.className = "checkout-item-price"
    checkoutItemPrice.innerHTML = "Rs" + data.price
    checkoutDetailsSetion.appendChild(checkoutItemPrice)

    return checkoutSection
}
function emptyCart() {
    var cartImg = document.createElement("img");
    cartImg.src = "https://i.pinimg.com/originals/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.png";
    cartImg.className = "empty-cart-image"

    return cartImg;
}
if (orderData === null) {
    checkoutSectionContainer.append(emptyCart());
}
for (let i = 0; i < orderData.length; i++) {
    checkoutSectionContainer.append(createCheckoutSection(orderData[i]));
}


function priceSection(data) {

    const priceSection = document.createElement("div")
    priceSection.className = "price-section"
    const ammountTag = document.createElement("h5")
    ammountTag.className = "total-ammount-tag"
    ammountTag.innerHTML = "Total Amount"
    priceSection.appendChild(ammountTag)
    const totalAmmount = document.createElement("h3")
    totalAmmount.className = "total-ammount"
    totalAmmount.innerHTML = data.totalPrice
    priceSection.appendChild(totalAmmount)
    const placeOrderButton = document.createElement("input")
    placeOrderButton.className = "place-order-button"
    placeOrderButton.value = "Place Order"
    placeOrderButton.type = "submit"
    placeOrderButton.onclick = function () {
        window.location.assign("../Order-Conformation-Page/conformation.html")
        postOrder(orderPlace)
        localStorage.clear();
    }
    priceSection.appendChild(placeOrderButton)

    return priceSection
}
checkoutContainer.appendChild(priceSection(orderTotal))

function postOrder(info) {
    var xhttp = new XMLHttpRequest()
    xhttp.open('POST', "https://5d76bf96515d1a0014085cf9.mockapi.io/order", true)
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(info))
}