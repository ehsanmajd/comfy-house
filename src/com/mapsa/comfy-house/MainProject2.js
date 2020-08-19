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

  inc(){
    this.quantity++
  }

  dec(){
    this.quantity--
  }

  render(){

    this.cartItem = document.getElementsByClassName("cart-item")
    this.cart = document.getElementById("cart")


    builder.create('img').src(product.image).appendTo(cartItem)
    const div1 = builder.create('div').appendTo(cartItem)
    builder.create('h4').text(product.title).appendTo(div1)
    builder.create('h5').text(product.price).appendTo(div1)
    builder.create('span').text(remove).className('remove-item').appendTo(div1)

    const div2 = builder.create('div').appendTo(cartItem)
    builder.create('i').className('fa-chevron-up').text('::before').appendTo(div2)
    // .onclick(inc())
    builder.create('p').className('item-amount')
    // .text(this.quantity)
    builder.create('i').className('fa-chevron-down').text('::before').appendTo(div2)
    // .onclick(dec())
    const content = builder.create('div').className("cart-content").appendTo(this.cart)
    // 
    const cartItem = builder.create('div').className('cart-item').appendTo(content)

  }

  remove(){}

}

cartItems = []

class Cart {
  constructor(){
  }

  render(){
    this.main = document.getElementsByClassName("cart-overlay")
    this.cart = document.getElementById("cart")
  
    builder.create('div').className('cart').appendTo(this.main)
    const span = builder.create('span').className("close-cart").appendTo(this.cart)
    builder.create('i').className("fas fa-window-close").text('::before').appendTo(span)
    builder.create('h2').text('Your Cart').appendTo(this.cart)

    const footer = builder.create('div').className("cart-footer").appendTo(this.cart)
    const h3 = builder.create('h3').text('your total : $').appendTo(footer)
    // 
    builder.create('span').className('cart-total').appendTo(h3)
    builder.create('button').className('clear-cart banner-btn').text('clear cart').appendTo(footer)
  }

  clearCart(){}

  add(id, price, image, title) {
    const cartItem = new CartItem(title,image,id,price)
    const ccc = cartItems.find(cItem => cItem.id === cartItem.id)
    ccc ? cartItem.inc(ccc.id) : cartItems.push(cartItem)
    
  }

  toggle(){
    const showCart = document.querySelector(".cart");
    showCart.classList.contains("showCart") ? showCart.classList.remove("showCart") : showCart.classList.add("showCart")

    const cartOverLay = document.querySelector(".cart-overlay");
    cartOverLay.classList.contains("transparentBcg") ? cartOverLay.classList.remove("transparentBcg") : cartOverLay.classList.add("transparentBcg")
  
  }

  totalPrice(){}

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
openCart.addEventListener("click", ()=>{ new Cart().toggle()})
closeCart.addEventListener("click", ()=>{ new Cart().toggle()})


