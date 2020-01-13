const productDetailContainer = document.getElementById("product-details-container")
var cartCount = document.getElementById("cart-count")
var couter = 0;
var totalCart = JSON.parse(localStorage.getItem("orderTotal"));
cartCount.innerHTML = totalCart === null ? "0" : totalCart.totalOrderQuantity;
var responseId = location.search.split("=")[1]
const responseApi = "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + responseId
const xhttps = new XMLHttpRequest()
xhttps.open('GET', responseApi, true)
xhttps.onreadystatechange = function () {
    if (this.readyState === 4) {
        var responseData = JSON.parse(this.responseText)
        productDetailContainer.appendChild(createProductDetailsCard(responseData))
    }
}
xhttps.send()

function createProductDetailsCard(data) {
    const productSection = document.createElement("div")
    productSection.id = "product-section"
    const itemImageWrapper = document.createElement("div")
    itemImageWrapper.className = "item-image-wrapper"
    productSection.appendChild(itemImageWrapper)
    const itemMainImage = document.createElement("img")
    itemMainImage.src = data.preview
    itemMainImage.className = "item-main-image"
    itemImageWrapper.appendChild(itemMainImage)
    const itemDetails = document.createElement("div")
    itemDetails.className = "item-details"
    productSection.appendChild(itemDetails)
    const itemDescription = document.createElement("div")
    itemDescription.className = "item-description"
    itemDetails.appendChild(itemDescription)
    const itemHead = document.createElement("h1")
    itemHead.className = "item-head"
    itemHead.innerHTML = data.name
    itemDescription.appendChild(itemHead)
    const itemTag = document.createElement("h5")
    itemTag.className = "item-tag"
    itemTag.innerHTML = data.brand
    itemDescription.appendChild(itemTag)
    const itemCartPrice = document.createElement("p")
    itemCartPrice.className = "item-cart-price"
    itemCartPrice.innerHTML = data.price
    const itemDec = document.createElement("p")
    itemDec.className = "item-dec"
    itemDec.innerHTML = "Decription"
    itemDescription.appendChild(itemDec)
    const itemDecSection = document.createElement("p")
    itemDecSection.className = "item-dec-sec"
    itemDecSection.innerHTML = data.description
    itemDescription.appendChild(itemDecSection)
    const itmePreview = document.createElement("div")
    itmePreview.className = "item-preview"
    itemDetails.appendChild(itmePreview)
    const productHead = document.createElement("p")
    productHead.className = "product-head"
    productHead.innerHTML = "Product Preview"
    itmePreview.appendChild(productHead)
    const previewDivision = document.createElement("div")
    previewDivision.className = "preview-division"

    function createPreviewImage(images) {
        var previewImages = document.createElement("img")
        previewImages.className = "preview-imag"
        previewImages.src = images
        previewImages.onclick = function (e) {
            var imageClasses = document.querySelectorAll(".preview-imag")
            for (var i = 0; i < imageClasses.length; i++) {
                if (imageClasses[i].classList[1] === "preview-image-select") {
                    imageClasses[i].classList.remove("preview-image-select")
                } else {
                    previewImages.classList.add("preview-image-select")
                    itemMainImage.src = e.target.src

                }

            }
        }
        itmePreview.appendChild(previewDivision)
        return previewImages
    }

    for (var i = 0; i < data.photos.length; i++) {
        previewDivision.appendChild(createPreviewImage(data.photos[i], i))
    }

    const itemAddCart = document.createElement("div")
    itemDetails.appendChild(itemAddCart)
    const addCartBtn = document.createElement("input")
    addCartBtn.type = "submit"
    addCartBtn.value = "Add To Cart"
    addCartBtn.className = "addcart-btn"
    var qunntityPrice = data.price;
    addCartBtn.onclick = function () {
        couter += 1;
        var totalPrice = data.price * couter
        cartCount.innerHTML = couter
        var cartObj = {
            id: data.id,
            name: data.name,
            price: data.price,
            preview: data.preview,
            quantity: couter,
            totalPrice: totalPrice
        }
        var grandTotal = {
            totalOrderQuantity: couter,
            totalPrice: totalPrice,
            totalAmt: cartCount.innerHTML
        };
        var orderTotal = JSON.parse(localStorage.getItem("orderTotal"));
        if (orderTotal === null) {
            orderTotal = []
            localStorage.setItem("orderTotal", JSON.stringify(grandTotal))
        } else {
            orderTotal.totalOrderQuantity = orderTotal.totalOrderQuantity + 1;
            orderTotal.totalPrice = orderTotal.totalPrice + data.price;
            localStorage.setItem("orderTotal", JSON.stringify(orderTotal));
            cartCount.innerHTML = orderTotal.totalOrderQuantity;
        }
        var OrderData = JSON.parse(localStorage.getItem("orderData"));
        var localOrderData;
        if (OrderData === null) {
            OrderData = [];
            localStorage.setItem("orderData", JSON.stringify([cartObj]));
        } else {
            for (let i = 0; i < OrderData.length; i++) {
                if (OrderData[i].id === cartObj.id) {
                    OrderData[i].quantity = couter;
                    OrderData[i].price = totalPrice;
                    localStorage.setItem("orderData", JSON.stringify(OrderData));
                } else {
                    localOrderData = JSON.parse(localStorage.getItem("orderData"));
                    console.log(OrderData.length);
                    if (i + 1 === OrderData.length) {
                        localOrderData.push(cartObj);
                        localStorage.setItem("orderData", JSON.stringify(localOrderData));
                    }
                }
            }
        }

    }
    itemAddCart.appendChild(addCartBtn)

    return productSection;
}
