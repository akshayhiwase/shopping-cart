$(document).ready(function () {
    $('.carousel-menu').slick({
        infinite: true,
        dots: true,
        arrows: false,
        button: false,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
        fadeSpeed: 2000,
        centerMode: true

    });

});
const cartData = []

const mainContainer = document.getElementById("main-container")
const clothingSection = document.getElementById("clothing-section")
const accessoriesSection = document.getElementById("accessories-section")
var cartCount = document.getElementById("cart-count")
var totalCart = JSON.parse(localStorage.getItem("orderTotal"));
cartCount.innerHTML = totalCart === null ? "0" : totalCart.totalOrderQuantity;
function createAccessorisSection(data) {

    const assessoriesCard = document.createElement("a")
    assessoriesCard.className = "accessories-card"
    assessoriesCard.onclick = function () {
        assessoriesCard.href = "../Product-Detail-Page/product-details.html?=" + data.id
    }
    const assessoriesImageSection = document.createElement("div")
    assessoriesImageSection.className = "accessories-img-section"
    assessoriesCard.appendChild(assessoriesImageSection)
    const assessoriesImage = document.createElement("img")
    assessoriesImage.src = data.preview
    assessoriesImage.className = "accessories-img"
    assessoriesImageSection.appendChild(assessoriesImage)
    const assessoriesDetails = document.createElement("div")
    assessoriesDetails.className = "accessories-details"
    assessoriesCard.appendChild(assessoriesDetails)
    const itemName = document.createElement("h4")
    itemName.className = "item-name"
    itemName.innerHTML = data.name
    assessoriesDetails.appendChild(itemName)
    const itemBrand = document.createElement("p")
    itemBrand.className = "item-brand"
    itemBrand.innerHTML = data.brand
    assessoriesDetails.appendChild(itemBrand)
    const itemPrice = document.createElement("p")
    itemPrice.className = "item-price"
    itemPrice.innerHTML = "Rs" + " " + data.price
    assessoriesDetails.appendChild(itemPrice)

    return assessoriesCard;


}

var xhttp = new XMLHttpRequest()
xhttp.open('GET', "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true)
xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
        const responcData = JSON.parse(this.responseText)
        for (let i = 0; i < responcData.length; i++) {
            if (responcData[i].isAccessory == false) {
                clothingSection.appendChild(createAccessorisSection(responcData[i], i))
            } else {
                accessoriesSection.appendChild(createAccessorisSection(responcData[i], i))
            }
            // responcData[i] === false ? clothingSection.appendChild(createAccessorisSection(responcData[i]))
            //     : accessoriesSection.appendChild(createAccessorisSection(responcData[i]));

        }
    }
}
xhttp.send()