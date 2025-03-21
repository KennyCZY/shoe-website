if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    displayPayment()
}

function displayPayment() {
    var paymentOptions = document.getElementById('payment-option')
    var paymentDetail1 = document.getElementById('payment-detail1')
    var paymentDetail2 = document.getElementById('payment-detail2')
    var paymentDetail3 = document.getElementById('payment-detail3')
    var button = document.getElementById('button')

    paymentOptions.addEventListener('change',function(){
        console.log(window.location.href)
        if (paymentOptions.value === 'Credit/Debit Card') {
            paymentDetail1.style.display = 'block'
            paymentDetail2.style.display = 'none'
            paymentDetail3.style.display = 'none'
            button.style.display = 'block'
            button.style.marginTop = '265px'
          } else if (paymentOptions.value === 'TnG') {
            paymentDetail1.style.display = 'none'
            paymentDetail2.style.display = 'block'
            paymentDetail3.style.display = 'none'
            button.style.display = 'block'
            button.style.marginTop = '20px'
          } else if (paymentOptions.value === 'Online Banking') {
            paymentDetail1.style.display = 'none'
            paymentDetail2.style.display = 'none'
            paymentDetail3.style.display = 'block'
            button.style.display = 'block'
            button.style.marginTop = '250px'
          } else{
            paymentDetail1.style.display = 'none'
            paymentDetail2.style.display = 'none'
            paymentDetail3.style.display = 'none'
            button.style.display = 'block'
            button.style.marginTop = '320px'
          }
    })

    button.addEventListener('click',function(){
        sessionStorage.clear()
    })
}