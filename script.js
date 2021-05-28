window.onload = function() {
    var cart = {};
    var goods = {};

    function showDate() {
        var str = '';
        var now = new Date();
        str = now.toLocaleTimeString();
        document.querySelector('.date').innerHTML = str;
    }
    setInterval(showDate, 1000)
    $.getJSON("https://spreadsheets.google.com/feeds/list/1se-pPk28OBJFHydhbVyg77ee6pFOUXRBSXA8CE4O7E4/od6/public/values?alt=json",
        function(data) {
            console.log(data);
            data = data['feed']['entry'];
            console.log(data);
            goods = arraayHelper(data);
            console.log(goods);
            showProduct(data);

        }
    );

    function showProduct(data) {
        var out = ''
        console.log(data.length);
        for (var i = 0; i < data.length; i++) {
            out += `<div class="card">`;
            out += `<h3 class="title">${data[i]['gsx$name']['$t']}</h3>`;
            out += `<img src="${data[i]['gsx$image']['$t']}" alt="">`;
            out += `<p class="price">Цена:${data[i]['gsx$price']['$t']} </p>`;
            out += `<button name="add_to_cart" data="${data[i]['gsx$article']['$t']}">взять в кредит</button>`;
            out += `</div>`;
        }
        document.querySelector('.shop_field').innerHTML = out;
        document.onclick = function(e) {
            console.log(e.target.attributes.name.nodeValue, e.target.attributes.data.nodeValue);
            if (e.target.attributes.name.nodeValue == 'add_to_card');
            addToCart(e.target.attributes.data.nodeValue);
        }


    }

    function addToCart(elem) {
        if (cart[elem] !== undefined) {
            cart[elem]++;
        } else {
            cart[elem] = 1;
        }
        console.log(cart);
        showCart();
    }

    function arraayHelper(arr) {
        var out = {};
        for (var i = 0; i < arr.length; i++) {
            var temp = {};
            temp['article'] = arr[i]['gsx$article']['$t'];
            temp['name'] = arr[i]['gsx$name']['$t'];
            temp['count'] = arr[i]['gsx$count']['$t'];
            temp['price'] = arr[i]['gsx$price']['$t'];
            temp['image'] = arr[i]['gsx$image']['$t'];
            out[arr[i]['gsx$article']['$t']] = temp;
        }
        return out;
    }

    function showCart() {
        var ul = document.querySelector('.cart');
        ul.innerHTML = '';
        var sum = 0;
        for (var key in cart) {
            var li = '<li>'
            li += goods[key]['name'] + ' ';
            li += cart[key] + 'шт';
            li += goods[key]['price'] * cart[key];
            sum += goods[key]['price'] * cart[key];
            ul.innerHTML += li;

        }
        ul.innerHTML += 'придется взять в кредит ' + sum;
    }
}