let carts = document.querySelectorAll('.add-cart');

let products = [
        {
                name: "Asher Tall Shelf",
                tag: "asher_tallshelf1",
                price: 150,
                inCart: 0
        },
        {
                name: "Axel Side Chair",
                tag: "axel_side_chair1",
                price: 100,
                inCart: 0
        },
        {
                name: "Bruno Dining Table",
                tag: "bruno_diningtable1",
                price: 1040,
                inCart: 0
        },
        {
                name: "Clare Dinner Plates Set",
                tag: "clare_dinnerplateset1",
                price: 55,
                inCart: 0
        },
        {
                name: "Dual Tone 3 Seater Sofa",
                tag: "dualtone_3seatersofa1",
                price: 399,
                inCart: 0
        },
        {
                name: "Emelie Tv Console",
                tag: "emelie_tvconsole1",
                price: 399,
                inCart: 0
        },
        {
                name: "Grasshoppa Floor Lamp",
                tag: "grasshoppa_floorlamp1",
                price: 149,
                inCart: 0
        },
        {
                name: "Isabella Floor Lamp",
                tag: "isabella_floorlamp1",
                price: 179,
                inCart: 0
        },
        {
                name: "Linate Cofee Table",
                tag: "linate_coffeetable1",
                price: 1279,
                inCart: 0
        },
        {
                name: "Reagan Book Shelf",
                tag: "reagan_bookshelf1",
                price: 899,
                inCart: 0
        },
        {
                name: "Isabella Floor Lamp",
                tag: "isabella_floorlamp1",
                price: 179,
                inCart: 0
        },
        {
                name: "Linate Cofee Table",
                tag: "linate_coffeetable1",
                price: 1279,
                inCart: 0
        },
]

// "Add to cart" Function column

for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
                cartNumbers(products[i]);
                totalCost(products[i]);
        })
}

function onLoadCartNumbers() {
        let productNumbers = localStorage.getItem
        ('cartNumbers');

        if (productNumbers) {
                document.querySelector('.cart span').textContent = productNumbers;
        }
}

function cartNumbers(product, action) {

        let productNumbers = localStorage.getItem
        ('cartNumbers');
        productNumbers = parseInt(productNumbers);

        let cartItems = localStorage.getItem('productInCart');
        cartItems = JSON.parse(cartItems);

        if( action ) {
                localStorage.setItem('cartNumbers', productNumbers - 1);
                document.querySelector('.cart span').textContent = 
                productNumbers - 1;

        } else if (productNumbers) {
                localStorage.setItem('cartNumbers', productNumbers +1)
                document.querySelector('.cart span').textContent = productNumbers + 1;
        } else { 
                localStorage.setItem("cartNumbers", 1);
                document.querySelector('.cart span').textContent = 1;
        }
        setItems(product);
}

function setItems(product) {
        let cartItems = localStorage.getItem('productInCart');
        cartItems = JSON.parse(cartItems);

        if (cartItems != null) {
                let currentProduct = product.tag;

                if(cartItems[currentProduct] == undefined) {
                        cartItems = {
                                ...cartItems,
                                [currentProduct]: product
                        }
                }
                cartItems[product.tag].inCart += 1;

        } else {
                product.inCart = 1;
                cartItems = {
                        [product.tag]: product
                };
        }

        localStorage.setItem("productInCart", JSON.stringify(cartItems));
}

function totalCost(product,action) {
        let cartCost = localStorage.getItem('totalCost');
        
        console.log("My cartCost is", cartCost);
        console.log(typeof cartCost );

        if(action) {
                cartCost = parseInt(cartCost)

                localStorage.setItem("totalCost", cartCost - product.price);
        } else if(cartCost != null) {

                cartCost = parseInt(cartCost);
                localStorage.setItem("totalCost", cartCost + product.price);

        } else {
                localStorage.setItem("totalCost", product.price);
        }
}

// Shopping cart 

function displayCart() {
        let cartItems = localStorage.getItem("productInCart");
        cartconsole.log(cartItems);
        Items = JSON.parse(cartItems);

        let cartCost = localStorage.getItem('totalCost');
        // cartCost = parseInt(cart);

        let productContainer = document.querySelector
                (".productsIncart");
        
        


    if( cartItems && productContainer ) {
                productContainer.innerHTML = '';
                Object.values(cartItems).map(item => {
                        productContainer.innerHTML += `
                        <div class = "cartClass">
                                <div class = "productsCart">
                                        <ion-icon name="close-circle-outline"></ion-icon>
                                        <img src="assets/img/product/${item.tag}.jpeg" class="p3">
                                        <span>${item.name}</span>                      
                                </div>
                                
                                <div class = "priceCart">
                                        $${item.price}
                                </div>

                                <div class = "quantityCart">
                                        <ion-icon class="decrease" name="caret-back-outline"></ion-icon>
                                        <span>${item.inCart}</span>
                                        <ion-icon class="increase " name="caret-forward-outline"></ion-icon>
                                </div>

                                <div class="totalCart">
                                        $${item.inCart * item.price}
                                </div>
                        </div>

                        `
                });
                        productContainer.innerHTML += `
                                <div class="basketTotalContainer">
                                        <h4 class="basketTotalTitle">
                                                Basket Total:
                                        </h4>
                                        
                                        <h4 class ="basketTotal">
                                                $${cartCost}
                                        </h4>
                                </div>
                        `
                        
deleteButton();
manageQuantity();
        }
}

// Button function on Shopping cart

function deleteButton() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem('totalCost');
    // let productsInCart = localStorage.getItem("productsInCart")
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

function manageQuantity() {
        let decreaseButtons = document.querySelectorAll('.decrease');
        let increaseButtons = document.querySelectorAll('.increase');
        let currentQuantity = 0;
        let currentProduct = '';
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
    
        for(let i=0; i < increaseButtons.length; i++) {
            decreaseButtons[i].addEventListener('click', () => {
                console.log(cartItems);
                currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
                console.log(currentQuantity);
                currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
                console.log(currentProduct);
    
                if( cartItems[currentProduct].inCart > 1 ) {
                    cartItems[currentProduct].inCart -= 1;
                    cartNumbers(cartItems[currentProduct], "decrease");
                    totalCost(cartItems[currentProduct], "decrease");
                    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                    displayCart();
                }
            });
    
            increaseButtons[i].addEventListener('click', () => {
                console.log(cartItems);
                currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
                console.log(currentQuantity);
                currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
                console.log(currentProduct);
    
                cartItems[currentProduct].inCart += 1;
                cartNumbers(cartItems[currentProduct]);
                totalCost(cartItems[currentProduct]);
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            });
        }
    }
    

onLoadCartNumbers();
displayCart();

// fetch data function

function fetchUserData() {
        fetch('product.json')
        .then(response => response.json())
        .then(users => {
            let output = '<h2>List of Users</h2>';
            output += '<ul>';
                users.forEach(function(user) {
                    output += `
                  <div class="col-lg-4 col-sm-6 portfolio-item">
                    <div class="card h-100">
                      <a href="#"><img
                          class="card-img-top"
                          src="assets/img/product/linate_coffeetable1.jpeg"
                          height="350"
                          alt=""
                      /></a>
                      <div class="card-body">
                        <h4 class="card-title">Linate Coffee Table</h4>
                        <p class="card-text">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </p>
                        <a class="add-cart cart12" href="#">Add Cart</a>
                      </div>
                    </div>
                  </div>
                `;
                });
                output +='</ul>';
                document.getElementById("response").innerHTML = output;
        });
    }


