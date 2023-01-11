let data = `{
    "items": [
      {
        "sys": { "id": "1" },
        "fields": {
          "title": "queen panel bed",
          "price": 10.99,
          "image": { "fields": { "file": { "url": "../../../images/product-1.jpeg" } } }
        }
      },
      {
        "sys": { "id": "2" },
        "fields": {
          "title": "king panel bed",
          "price": 12.99,
          "image": { "fields": { "file": { "url": "../../../images/product-2.jpeg" } } }
        }
      },
      {
        "sys": { "id": "3" },
        "fields": {
          "title": "single panel bed",
          "price": 12.99,
          "image": { "fields": { "file": { "url": "../../../images/product-3.jpeg" } } }
        }
      },
      {
        "sys": { "id": "4" },
        "fields": {
          "title": "twin panel bed",
          "price": 22.99,
          "image": { "fields": { "file": { "url": "../../../images/product-4.jpeg" } } }
        }
      },
      {
        "sys": { "id": "5" },
        "fields": {
          "title": "fridge",
          "price": 88.99,
          "image": { "fields": { "file": { "url": "../../../images/product-5.jpeg" } } }
        }
      },
      {
        "sys": { "id": "6" },
        "fields": {
          "title": "dresser",
          "price": 32.99,
          "image": { "fields": { "file": { "url": "../../../images/product-6.jpeg" } } }
        }
      },
      {
        "sys": { "id": "7" },
        "fields": {
          "title": "couch",
          "price": 45.99,
          "image": { "fields": { "file": { "url": "../../../images/product-7.jpeg" } } }
        }
      },
      {
        "sys": { "id": "8" },
        "fields": {
          "title": "table",
          "price": 33.99,
          "image": { "fields": { "file": { "url": "../../../images/product-8.jpeg" } } }
        }
      }
    ]
  }`

class Product {
    constructor(title,image,id,price){
        this.title = title
        this.image = image
        this.id = id
        this.price = price
    }
    
    render(){
      this.product = document.getElementById('product')
      this.productsCenter = document.getElementById('products-center'); 
      this.list = document.getElementById('img-container') 
      const article = builder.create('article').appendTo(this.productsCenter).className('product')
      const div = builder.create('div').appendTo(article).className('img-container')
      builder.create('img').appendTo(div).src(this.image).className('product-img')
      const button = builder.create('button').className('bag-btn').appendTo(div)
      .on("click",  ()=> {
                new Cart().add(this.id, this.price,this.image,this.title)
              })
      builder.create('i').text('ADD TO CART').className('fas fa-shopping-cart')
      .appendTo(button)
      builder.create('i').className('fas fa-shopping-cart').appendTo(button)
      builder.create('h3').text(this.title).appendTo(article)
    }
}
class ProductList{ 
  render(product){
    product.render()
  }
}

class CartItem {
  constructor(title,image,id,price){
    this.title = title
    this.image = image
    this.id = id
    this.price = price
    this.quantity = 1
  }

  render(cartItem){
    this.cartContent = document.querySelector(".cart-content")
    const divCartItem = builder.create("div").className("cart-item").appendTo(this.cartContent)
    builder.create("img").src(cartItem.image).appendTo(divCartItem)
    const innerDiv = builder.create("div").appendTo(divCartItem)
    builder.create("h4").text(cartItem.title).appendTo(innerDiv)
    builder.create("h5").text(cartItem.price).appendTo(innerDiv)
    builder.create("span").text("remove").className("remove-item").appendTo(innerDiv).on("click", ()=>{
      new CartItem().remove(cartItem)
    })

    const div2 = builder.create('div').appendTo(divCartItem)

    builder.create('i').className('fas fa-chevron-up').appendTo(div2).onclick(()=>{this.inc(cartItem)})
    builder.create('p').className('item-amount').text(cartItem.quantity).appendTo(div2)
    builder.create('i').className('fas fa-chevron-down').appendTo(div2).onclick(()=>{this.dec(cartItem)})
  }

  remove(cartItem){
    cartItems = cartItems.filter(c => c.id != cartItem.id)
    new Cart().render();
  }

  inc(cartItem){
    const car = cartItems.find(ca => ca.id === cartItem.id)
    car.quantity++
    new Cart().render()
  }

  dec(cartItem){
    
    if(cartItem.quantity == 1){
      cartItems = cartItems.filter(cItem => cItem.id != cartItem.id)
    }else{
    const car = cartItems.find(ca => ca.id === cartItem.id)
    car.quantity--
    }
    new Cart().render()

  }
}

cartItems = []

class Cart {

  render(){
    const cartTotal = document.querySelector(".cart-total")
    const cartItemsClass = document.querySelector(".cart-items")
    var amount = 0
    var countItem = 0

    this.cartContent = document.querySelector(".cart-content")
    this.cartContent.innerHTML = ''; 

    cartItems.forEach(cartItem => {
      cartItem.render(cartItem)
      amount += cartItem.price * cartItem.quantity
      countItem += cartItem.quantity
    })

    cartItemsClass.textContent = countItem
    cartTotal.textContent = amount
  }

  inc(cartItem){
    cartItem.quantity++
  }

  add(id, price, image, title) {
    const cartItem = new CartItem(title,image,id,price)
    const existCartItem = cartItems.find(cItem => cItem.id === cartItem.id)
    existCartItem ? this.inc(existCartItem) : cartItems.push(cartItem)    
    this.render()
  }

  toggle(){
    const showCart = document.querySelector(".cart");
    showCart.classList.contains("showCart") ? showCart.classList.remove("showCart") : showCart.  classList.add("showCart")

    const cartOverLay = document.querySelector(".cart-overlay");
    cartOverLay.classList.contains("transparentBcg") ? cartOverLay.classList.remove("transparentBcg") : cartOverLay.classList.add("transparentBcg")

    this.render()
  }
}


const productList = new ProductList()
data = JSON.parse(data)
items = data.items
items.forEach(item => {
  id = item.sys.id,
  title = item.fields.title,
  image = item.fields.image.fields.file.url,
  price = item.fields.price
  productList.render(new Product(title,image,id,price))
})


const openCart = document.getElementById("cart-btn")
const closeCart = document.getElementById("close-cart")
const clearCart = document.querySelector(".clear-cart")
const cart = new Cart();
openCart.addEventListener("click", ()=>{ cart.toggle()})
closeCart.addEventListener("click", ()=>{ cart.toggle()})
clearCart.addEventListener("click" , ()=> {cartItems = [], cart.render()})
