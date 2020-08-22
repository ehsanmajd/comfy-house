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

class Product{
    constructor({
        id : id,
        title : title,
        price : price,
        image : image
    })
    
    {
    this.id = id;
    this.title = title;
    this.price = price;
    this.image = image;
    }
    
    render(){

      this.product = document.getElementById('product')
      this.productsCenter = document.getElementById('products-center'); 
      this.list = document.getElementById('img-container') 
      const article = builder.create('article').appendTo(this.productsCenter).className('product')
      const div = builder.create('div').appendTo(article).className('img-container')
      builder.create('img').appendTo(div).src(this.image).className('product-img')
      const button = builder.create('button').className('bag-btn').appendTo(div)
      builder.create('i').text('ADD TO CART').className('fas fa-shopping-cart')
      .on("click",  ()=> {
        new Cart().add(this.id, this.price,this.image,this.title)
      }).appendTo(button)
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
    constructor(id, title, price, image){
        this.id = id,
        this.title = title,
        this.price = price,
        this.image = image,
        this.quantity = 1
    }

    inc(){
        this.quantity++
    }
    dec(){
        this.quantity--
    }
    remove(){}

}

cartItems = [];

class Cart {  
  render(){
    this.cartContent = document.querySelector(".cart-content")
    const cartTotal = document.querySelector(".cart-total")
    const cartItemsClass = document.querySelector(".cart-items")
    this.cartContent.innerHTML = ''
            

    cartItems.forEach(cartItem => {
      const divCartItem = builder.create("div").className("cart-item").appendTo(this.cartContent)
      builder.create("img").src(cartItem.image).appendTo(divCartItem)
      const innerDiv = builder.create("div").appendTo(divCartItem)
      builder.create("h4").text(cartItem.title).appendTo(innerDiv)
      builder.create("h5").text(cartItem.price).appendTo(innerDiv)
      builder.create("span").text("remove").className("remove-item").appendTo(innerDiv)
      const div2 = builder.create('div').appendTo(divCartItem)

      builder.create('i').className('fas fa-chevron-up').appendTo(div2).onclick(this.inc(cartItem))
      builder.create('p').className('item-amount').text(cartItem.quantity).appendTo(div2)
      builder.create('i').className('fas fa-chevron-down').appendTo(div2)
      console.log(cartItems)
      })
    }
  

  inc(cartItem){
    const ddd = cartItems.find(dd => dd.id === cartItem.id)
    ddd.quantity++
    
    }
    

  add(id, price,image,title){
   const cartItem = new CartItem(id,title,price,image)
   const ccc = cartItems.find(cItem => cItem.id === cartItem.id)
   ccc ? this.inc(ccc) : cartItems.push(cartItem)
   this.render()
  }

  toggle(){
      const showCart = document.querySelector(".cart")
      showCart.classList.contains("showCart")? showCart.classList.remove("showCart") : showCart.classList.add("showCart")

      const overlay = document.querySelector(".cart-overlay")
      overlay.classList.contains("transparentBcg")? overlay.classList.remove("transparentBcg") : overlay.classList.add("transparentBcg")
  }
}


const productList = new ProductList();

data = JSON.parse(data)
let products = data.items
products.forEach(product => {
  let id = product.sys.id
  let title = product.fields.title
  let price = product.fields.price
  let image = product.fields.image.fields.file.url
  productList.render(new Product({id:id,title:title,price:price,image:image}))
})

const openCart = document.getElementById("cart-btn")
const closeCart = document.getElementById("close-cart")

const cart = new Cart();
openCart.addEventListener("click", ()=>{ cart.toggle()})
closeCart.addEventListener("click", ()=>{ cart.toggle()})
