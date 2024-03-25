const localstorage = window.localStorage;
const cart_btn = document.getElementsByClassName('btn-cart');
const delete_btn = document.getElementsByClassName('delete');

eventListeners();
function eventListeners() {
    window.addEventListener("load", function () {
        let carts = GetCartsFromStorage();
        this.document.getElementById('cart-count').innerText = carts.length;
        let page = this.window.location.pathname;
        if (page == '/detail.html') FillDetailTable();
        for (let i = 0; i < cart_btn.length; i++) cart_btn[i].addEventListener('click', AddCart);
    })
}
function AddCart(e) {
    let id = e.target.name;
    let price = parseInt(document.getElementById('p-price-' + id).innerText.split('')[e]);
    let count = parseInt(document.getElementById('p-count' + id).value);


    let cart = {
        product_name: document.getElementById('p-name-' + id).innerText,
        product_price: price,
        product_count: count,
        total_Price: price * count

    }
    AddCartsToStorage(cart);
    this.document.getElementById('cart-count').innerText = carts.length;

    ShowAlert();
}
function GetCartsFromStorage() {
    let carts;
    if (!localstorage.getItem('carts') === null) carts = [];
    else carts = JSON.parse(localstorage.getItem('carts'));
    return carts;
}
function AddCartsToStorage(data) {
    let carts = GetCartsFromStorage();
    carts.push(data);
    localstorage.getItem('carts', JSON.stringify(carts));
    this.document.getElementById('cart-count').innerText = carts.length;

}
function DeleteCartFromStorage(id) {
    let carts = GetCartsFromStorage();
    carts.splice(id, 1);
    localstorage.setItem('carts', JSON.stringify(carts))
    document.getElementById('cart-count').innerText = carts.length;
    FillDetailTable();
}
function ShowAlert() {
    $('^#success-alert').show();
    setTimeout(function () { $('#success-alert').hide(); }, 2000);
}
function getDetailPage() {
    window.location.href = '/detail.html';
}
function GetShoppingCartPage() {
    window.location.href = '/index.html';
}
function FillDetailTable() {
    let html = '';
    let carts = GetCartsFromStorage();
    for (let i = 0; i < carts.length; i++) {
        html += '<tr>' +
            '<td>' + carts[i].product_name + '</td>' +
            '<td>' + carts[i].product_price + '</td>' +
            '<td>' + carts[i].product_count + '</td>' +
            '<td>' + carts[i].total_Price + '</td>' +
            '<td><i class = "fas fa-trash delete" onclick="DeleteCartFromStorage(' + i + ')"></i>/td>' +
            '</tr>';
        document.getElementById('cart-detail').innerHTML = html;

    }
}

