
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    displayMessage()
    displayTotal()
    checkForm()
}

function displayMessage() {
    const stdDelivery = document.querySelector('input[value="std"]')
    const expDelivery = document.querySelector('input[value="exp"]')
    const stdInfo = document.getElementById('standard-info')
    const expInfo = document.getElementById('express-info')
    const stdBorder = document.getElementById('standard')
    const expBorder = document.getElementById('express')

    stdDelivery.addEventListener('click', function () {
        stdInfo.style.display = 'block'
        expInfo.style.display = 'none'
        stdBorder.style.border = 'solid 2px'
        expBorder.style.border = 'none'
        document.getElementById('shipping').innerText = 'Free'
    })
    expDelivery.addEventListener('click', function () {
        stdInfo.style.display = 'none'
        expInfo.style.display = 'block'
        stdBorder.style.border = 'none'
        expBorder.style.border = 'solid 2px'
        document.getElementById('shipping').innerText = 'RM 10'
    });
}

function displayTotal(){
    var total = sessionStorage.getItem('total')
    console.log(total)
    document.getElementById('subtotal').innerText= 'RM ' + total
}

function checkForm(){
    var button = document.getElementById('button')
    var fname = document.getElementById('fname')
    var lname = document.getElementById('lname')
    var country = document.getElementById('country')
    var address = document.getElementById('address')
    var city = document.getElementById('city')
    var state = document.getElementById('state')
    var code = document.getElementById('code')
    var phone = document.getElementById('phone')
    var email = document.getElementById('email')

    button.addEventListener('click',function(){        
        function validateForm(){
            if(fname.value === "" || lname.value === "" || country.value === "" || address.value === "" || city.value === "" || state.value === "" || code.value === "" || phone.value === "" || email.value === ""){
                alert("Please fill out all required fields.")
            } else {
                window.location.href = "payment.html"
                button.removeEventListener('click', validateForm)
            }
        }
    
        button.addEventListener('click', validateForm)
    })


}
