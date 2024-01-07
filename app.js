const ExmpProducts = [
    {
        id: 1,
        title: 'Healthy mixed vegitables salad',
        photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        reviewStar: 4,
        price: '12',
        discount: 25
    },
    {
        id: 2,
        title: 'Italian pizza with extra cheese',
        photo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        reviewStar: 4,
        price: '10',
        discount: 25
    },
    {
        id: 3,
        title: 'Strawberry vanilla cake',
        photo: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        reviewStar: 4,
        price: '5',
        discount: 25
    },
    {
        id: 4,
        title: 'Healthy Salad platter 2',
        photo: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        reviewStar: 4,
        price: '7',
        discount: 25
    },
]



const cartIcon = document.querySelector('.cart__icon')
const cartSidebar = document.querySelector('.cart__sidebar')
const sidebarCloseBtn = document.querySelector('.close')
const foodList = document.querySelector('.menu__items')
const cartList = document.querySelector('.food__list')
const cartItemsIcon = document.querySelector('.cart__items')
const cartItemAdd = document.querySelector('.add')
const cartItemRemove = document.querySelector('.remove')


let cart = []



// ----------- SIDEBAR OPEN/CLOSE

cartIcon.addEventListener('click', () => {
    cartSidebar.classList.toggle('show__cart')
})

sidebarCloseBtn.addEventListener('click', () => {
    cartSidebar.classList.toggle('show__cart')
})


// ----------- ADD PRODUCTS IN MENU



const addFoodsToHTML = () => {
    if (ExmpProducts.length > 0) {
        ExmpProducts.forEach(products => {
            let foodItems = document.createElement('div')

            foodItems.classList.add('item', 'bg-amber-100', 'px-4', 'py-4', 'rounded-[1rem]')
            foodItems.innerHTML = `
            <div class="item__img">
                    <img class="w-[100%] h-[17rem] object-cover rounded-[1rem]" src=${products.photo}>
                </div>

                <div class="item__content mt-4">
                    <h5 class="text-2xl font-semibold tracking-tight text-gray-900">${products.title}</h5>


                    <div class="flex items-center justify-between mt-3">
                        <span class="text-2xl font-bold ">$${products.price}</span>
                        <a href="#" data-id="${products.id}"
                            class="addto__cart text-white bg-amber-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Add
                            to cart</a>
                    </div>
                </div>
            `

            foodList.appendChild(foodItems)
        })
    }
}



// ------------- ADD PRODUCT IN CART


const addToCart = (productID) => {
    let positionCurrentProduct = cart.findIndex((value) => value.product_id == productID)

    if (cart.length <= 0) {
        cart = [{
            product_id: productID,
            quantity: 1
        }]
    } else if (positionCurrentProduct < 0) {
        cart.push({
            product_id: productID,
            quantity: 1
        })
    } else {
        cart[positionCurrentProduct].quantity = cart[positionCurrentProduct].quantity + 1
    }

    addCartItemHTML()
    localStorage.setItem('carts', JSON.stringify(cart))

}


const addCartItemHTML = () => {
    cartList.innerHTML = ''
    let totalCartItems = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalCartItems = totalCartItems + item.quantity

            let cartItem = document.createElement('div')
            cartItem.classList.add('product', 'grid__row__4')

            let positionOfProduct = ExmpProducts.findIndex((value) => value.id == item.product_id)
            let productInfo = ExmpProducts[positionOfProduct]
            cartItem.innerHTML = `
            <img class="product__img w-[100%] object-cover rounded-[1rem]" src=${productInfo.photo} alt=""
                    srcset="">

                <h1 class="text-lg  font-bold">${productInfo.title}</h1>
                <div class="font-bold flex justify-between items-center">$${productInfo.price * item.quantity}</div>
                <div class="quantity" data-id="${productInfo.id}">
                    <span class="remove rounded-[1rem] bg-amber-100 cursor-pointer">-</span>
                    <span>${item.quantity}</span>
                    <span class="add rounded-[1rem] bg-amber-100 cursor-pointer">+</span>
                </div>
            `
            cartList.appendChild(cartItem)
        })

    }

    cartItemsIcon.innerText = totalCartItems
}



foodList.addEventListener('click', (event) => {
    let positionClick = event.target

    if (positionClick.classList.contains('addto__cart')) {
        let productID = positionClick.dataset.id
        addToCart(productID)
    }

})



// ------------- ADDING OR REMOVING PRODUCT QUANTITY


const changeProductQuantity = (product_id, type) => {

    let itemPositionInCart = cart.findIndex((value) => value.product_id == product_id)

    if (itemPositionInCart >= 0) {

        if (type == 'add') {
            cart[itemPositionInCart].quantity = cart[itemPositionInCart].quantity + 1
        } else if (type == 'minus') {
            let quantityChnage = cart[itemPositionInCart].quantity - 1
            if (quantityChnage > 0) {
                cart[itemPositionInCart].quantity = quantityChnage
            }
            else{
                cart.splice(itemPositionInCart, 1)
            }

        }
    }

    localStorage.setItem('carts', JSON.stringify(cart))
    addCartItemHTML()
}

cartList.addEventListener('click', (event) => {
    let positionClick = event.target

    if (positionClick.classList.contains('add')) {
        let product_id = positionClick.parentElement.dataset.id
        changeProductQuantity(product_id, 'add')
    } else if (positionClick.classList.contains('remove')) {
        let product_id = positionClick.parentElement.dataset.id
        changeProductQuantity(product_id, 'minus')
    }
})


// ----------- INIT ALL FUNCTIONS

function initApp() {
    addFoodsToHTML()

    if (localStorage.getItem('carts')) {
        cart = JSON.parse(localStorage.getItem('carts'))
        addCartItemHTML()
    }
}


initApp()