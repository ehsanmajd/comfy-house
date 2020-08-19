// let data = `{
//     "items": [
//       {
//         "sys": { "id": "1" },
//         "fields": {
//           "title": "queen panel bed",
//           "price": 10.99,
//           "image": { "fields": { "file": { "url": "../../../images/product-1.jpeg" } } }
//         }
//       },
//       {
//         "sys": { "id": "2" },
//         "fields": {
//           "title": "king panel bed",
//           "price": 12.99,
//           "image": { "fields": { "file": { "url": "../../../images/product-2.jpeg" } } }
//         }
//       },
//       {
//         "sys": { "id": "3" },
//         "fields": {
//           "title": "single panel bed",
//           "price": 12.99,
//           "image": { "fields": { "file": { "url": "../../../images/product-3.jpeg" } } }
//         }
//       },
//       {
//         "sys": { "id": "4" },
//         "fields": {
//           "title": "twin panel bed",
//           "price": 22.99,
//           "image": { "fields": { "file": { "url": "../../../images/product-4.jpeg" } } }
//         }
//       },
//       {
//         "sys": { "id": "5" },
//         "fields": {
//           "title": "fridge",
//           "price": 88.99,
//           "image": { "fields": { "file": { "url": "../../../images/product-5.jpeg" } } }
//         }
//       },
//       {
//         "sys": { "id": "6" },
//         "fields": {
//           "title": "dresser",
//           "price": 32.99,
//           "image": { "fields": { "file": { "url": "../../../images/product-6.jpeg" } } }
//         }
//       },
//       {
//         "sys": { "id": "7" },
//         "fields": {
//           "title": "couch",
//           "price": 45.99,
//           "image": { "fields": { "file": { "url": "../../../images/product-7.jpeg" } } }
//         }
//       },
//       {
//         "sys": { "id": "8" },
//         "fields": {
//           "title": "table",
//           "price": 33.99,
//           "image": { "fields": { "file": { "url": "../../../images/product-8.jpeg" } } }
//         }
//       }
//     ]
//   }`


// class Product{
//     constructor({
//         id : id,
//         title : title,
//         price : price,
//         image : image
//     })
    
//     {
//     this.id = id;
//     this.title = title;
//     this.price = price;
//     this.image = image;
//     }
    
//     render(){

//       this.product = document.getElementById('product')
//       this.productsCenter = document.getElementById('products-center'); 
//       this.list = document.getElementById('img-container') 
//       const article = builder.create('article').appendTo(this.productsCenter).className('product')
//       const div = builder.create('div').appendTo(article).className('img-container')
//       builder.create('img').appendTo(div).src(this.image).className('product-img')
//       const button = builder.create('button').className('bag-btn').appendTo(div)
//       builder.create('i').text('ADD TO CART').className('fas fa-shopping-cart')
//       .on("click",  ()=> {
//         new Cart().add(this.id, this.price,this.image,this.title)
//       }).appendTo(button)
//       builder.create('i').className('fas fa-shopping-cart').appendTo(button)
//       builder.create('h3').text(this.title).appendTo(article)
//     }
// }

// class ProductManager {    
//   render(product) {
//     product.render()
//   }
// }

// class CartItem{
//   constructor(id,price,image,title){
//     this.id = id
//     this.price = price
//     this.image = image
//     this.title = title
//     this.quantity = 1;

//   }

//   remove(){
//   }

//   inc(){
//     this.quantity++
//   }

//   dec(){
//     return --this.quantity;
//   }


// }

// cartItems = []

// class Cart {
//   constructor(){
//     this.cartContent = document.getElementsByClassName("cart-content")
//     this.clsBtn = document.getElementsByClassName("close-cart")
//     this.showQuantity = document.getElementsByClassName("cart-items")
//     this.cartTotal = document.getElementsByClassName("cart-total")
//   }
//   clear(){}


//   render(){}

//   add(id, price,image,title){
//     const cartItem = new CartItem(id,price,image,title); 
//     const ccc =  cartItems.find(cItem =>  cItem.id ===  cartItem.id )
//     ccc ? cartItem.inc(ccc.id): cartItems.push(cartItem)   
//     this.render()
//   }


// }


// const manager = new ProductManager();

// data = JSON.parse(data)
// let products = data.items
// products.forEach(product => {
//   let id = product.sys.id
//   let title = product.fields.title
//   let price = product.fields.price
//   let image = product.fields.image.fields.file.url
//   manager.render(new Product({id:id,title:title,price:price,image:image}))
// })
