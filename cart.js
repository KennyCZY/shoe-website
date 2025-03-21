if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    addToCart()
    displayCart()
    removeItem()
    increase()
    decrease()
}

var cart = JSON.parse(sessionStorage.getItem('cart')) || []


function addToCart() {
    var addToCartButtons = document.querySelectorAll('.ATCbtn')
    for (i = 0; i < addToCartButtons.length; i++) {
        var addToCartClicked = addToCartButtons[i]
        addToCartClicked.addEventListener('click', function (event) {
            var clicked = event.target
            var item = clicked.closest('.card')
            var itemImage = item.querySelector('.image img').getAttribute('src')
            var itemName = item.querySelector('.products_name').textContent
            var itemPrice = parseInt(item.querySelector('.products_price').textContent.replace('RM ', ' '))

            var index = cart.findIndex(item => item.itemName === itemName)
            if (index === -1) {
                cart.push({
                    itemImage,
                    itemName,
                    itemPrice,
                    quantity: 1
                })
            } else {
                cart[index].quantity++
            }

            sessionStorage.setItem('cart', JSON.stringify(cart))
            alert("Item added to cart")

            
        })

    }

}


function displayCart() {
    if (window.location.pathname === '/cart.html') {
        var cartArea = document.querySelector('.all-items')
        console.log(cartArea)
        if (!cartArea) {
            console.log("bug")
        }
        let cartData = JSON.parse(sessionStorage.getItem('cart'))


        if (cartData && cartData.length > 0) {
            for (i = 0; i < cartData.length; i++) {
                var cartElement = document.createElement('div')
                cartElement.classList.add('items')

                var cartItemImage = document.createElement('div')
                cartItemImage.classList.add('item-image')
                var image = document.createElement('img')
                image.src = cartData[i].itemImage
                cartItemImage.appendChild(image)
                cartElement.appendChild(cartItemImage)

                var cartItemDetail = document.createElement('div')
                cartItemDetail.classList.add('detail')
                var name = document.createElement('h1')
                name.classList.add('name')
                name.textContent = cartData[i].itemName
                cartItemDetail.appendChild(name)

                var size = document.createElement('select')
                size.classList.add('size')
                for (let i = 38; i <= 42; i++) {
                    var option = document.createElement('option')
                    var value = document.createElement('h3')
                    value.textContent = i
                    option.appendChild(value)
                    size.appendChild(option)
                }
                cartItemDetail.appendChild(size)
                cartElement.appendChild(cartItemDetail)

                var cartItemQuantity = document.createElement('div')
                cartItemQuantity.classList.add('quantity')
                var decButton = document.createElement('button')
                decButton.classList.add('btn-dec')
                decButton.textContent = '-'
                var quantity = document.createElement('div')
                quantity.classList.add('qty')
                quantity.textContent = cartData[i].quantity
                var incButton = document.createElement('button')
                incButton.classList.add('btn-inc')
                incButton.textContent = '+'
                cartItemQuantity.appendChild(decButton)
                cartItemQuantity.appendChild(quantity)
                cartItemQuantity.appendChild(incButton)
                cartElement.appendChild(cartItemQuantity)

                var cartItemAmount = document.createElement('div')
                cartItemAmount.classList.add('amount')
                var price = document.createElement('div')
                price.classList.add('price')
                price.textContent = 'RM ' + cartData[i].itemPrice
                var removeButton = document.createElement('button')
                removeButton.classList.add('remove')
                removeButton.textContent = 'Remove'
                var subtotal = document.createElement('div')
                subtotal.classList.add('subtotal')
                subtotal.textContent = 'RM ' + cartData[i].itemPrice * cartData[i].quantity
                cartItemAmount.appendChild(price)
                cartItemAmount.appendChild(removeButton)
                cartItemAmount.appendChild(subtotal)
                cartElement.appendChild(cartItemAmount)

                cartArea.appendChild(cartElement)
            }
        } else {
            cartArea.innerHTML = '<p style="margin-top: 10%; margin-left: 45%;color: gray;opacity: 0.5;font-weight:bold;font-size: 28px;">Empty cart</p>'

        }

        countTotal()
    }
}


function removeItem() {
    var removeItemButton = document.getElementsByClassName('remove')
    console.log(removeItemButton)
    for (i = 0; i < removeItemButton.length; i++) {
        var clicked = removeItemButton[i]
        clicked.dataset.index = i
        clicked.addEventListener('click', function (event) {
            var removeClicked = event.target
            console.log(removeClicked)
            removeClicked.parentElement.parentElement.remove()

            var itemInArray = removeClicked.dataset.index
            cart.splice(itemInArray, 1);
            sessionStorage.setItem('cart', JSON.stringify(cart))

            console.log(cart)

            displayEmptyCart()
            countTotal()
        })
    }
}


function decrease() {
    var decreaseButton = document.getElementsByClassName('btn-dec')
    console.log(decreaseButton)
    for (i = 0; i < decreaseButton.length; i++) {
        var clicked = decreaseButton[i]
        clicked.dataset.index = i
        clicked.addEventListener('click', function (event) {
            var decreaseCLicked = event.target
            var minusOne = decreaseCLicked.closest('.items')
            let quantity = parseInt(minusOne.querySelector('.qty').textContent)
            let price = parseInt(minusOne.querySelector('.price').textContent.replace('RM', ' '))
            quantity--
            var itemInArray = decreaseCLicked.dataset.index
            console.log(sessionStorage.cart)
            if (quantity == 0) {
                if (confirm('Remove Item from cart?')) {
                    decreaseCLicked.parentElement.parentElement.remove()
                    
                    cart.splice(itemInArray, 1);
                    sessionStorage.setItem('cart', JSON.stringify(cart))
                    console.log(sessionStorage.cart)
                    displayEmptyCart()
                    countTotal()
                    return

                } else {
                    quantity++
                }
            }
            var subtotal = 0
            subtotal = price * quantity
            minusOne.querySelector('.qty').textContent = quantity
            minusOne.querySelector('.subtotal').textContent = 'RM' + subtotal
            displayEmptyCart()
            countTotal()

            cart[itemInArray].quantity = quantity
            sessionStorage.setItem('cart', JSON.stringify(cart))

        })
    }
}

function increase() {
    var increaseButton = document.getElementsByClassName('btn-inc')
    console.log(increaseButton)
    for (i = 0; i < increaseButton.length; i++) {
        var clicked = increaseButton[i]
        clicked.dataset.index = i
        clicked.addEventListener('click', function (event) {
            var increaseCLicked = event.target
            var addOne = increaseCLicked.closest('.items')
            let quantity = parseInt(addOne.querySelector('.qty').textContent);
            let price = parseInt(addOne.querySelector('.price').textContent.replace('RM', ' '))
            quantity++
            var itemInArray = increaseCLicked.dataset.index
            var subtotal = 0
            subtotal = price * quantity
            console.log(subtotal)
            addOne.querySelector('.qty').textContent = quantity
            addOne.querySelector('.subtotal').textContent = 'RM' + subtotal
            countTotal()

            cart[itemInArray].quantity = quantity
            sessionStorage.setItem('cart', JSON.stringify(cart))
        })
    }
}

function displayEmptyCart(){
    if (window.location.pathname === '/cart.html'){
        var cartArea = document.querySelector('.all-items')
        if (cartArea.children.length === 0) {
            cartArea.innerHTML = '<p style="margin-top: 10%; margin-left: 45%;color: gray;opacity: 0.5;font-weight:bold;font-size: 28px;">Empty cart</p>'
          }
    }
}

function countTotal() {
    var cartItems = document.getElementsByClassName('items')
    var total = 0
    var totalQty = 0
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i]
        var CartPrice = cartItem.getElementsByClassName('price')[0]
        var CartQuantity = cartItem.getElementsByClassName('qty')[0]
        var price = parseInt(CartPrice.innerText.replace('RM', ''))
        var quantity = parseInt(CartQuantity.innerText)
        total = total + (price * quantity)
        totalQty = totalQty + quantity
    }
    console.log(total)

    document.getElementById('total-price').innerText = 'RM' + total
    document.getElementById('items-qty').innerText = totalQty + ' items'

    sessionStorage.setItem('total', total);
}
