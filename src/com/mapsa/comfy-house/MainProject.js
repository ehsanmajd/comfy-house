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

var counter = 1
class Product{
    constructor(id,title,price,image){
        this.id = id
        this.title = title
        this.price = price
        this.image = image
    }
    
}

class ProductList {
    constructor(){
        this.products = []
        
        this.product = document.getElementById('product')
        this.productsCenter = document.getElementById('products-center'); 
        this.list = document.getElementById('img-container')
       
       
    }

    add(product){     
        this.products.push(product)
    }

    paint() {
        this.productsCenter.innerHTML = '';
        this.products.forEach(product => {
            const article = builder.create('article').appendTo(this.productsCenter).className('product')
            const div = builder.create('div').appendTo(article).className('img-container')
            builder.create('img').appendTo(div).src(product.image).className('product-img')

            const button = builder.create('button').className('bag-btn').appendTo(div)
            builder.create('i').text('ADD TO CART').className('fas fa-shopping-cart').appendTo(button)
            builder.create('i').className('fas fa-shopping-cart').appendTo(button)
            builder.create('h3').text(product.title).appendTo(article)
        })
    }
}


function ElementBuilder(name) {
    this.element = document.createElement(name)
    
    this.text = function (text) {
        this.element.textContent = text;
        return this
    }

    this.type = function (type) {
        this.element.type = type
        return this
    }
    this.placeholder = function (text) {
        this.element.placeholder = text;
        return this;
    }
    this.value = function (value) {
        this.element.value = value;
        return this;
    }
    this.appendTo = function (parent) {
        if (parent instanceof ElementBuilder) {
            parent.build().appendChild(this.element)
            return this
        }
        else {
            parent.appendChild(this.element)
            return this
        }

    }
    this.build = function () {
        return this.element;
    }
    this.hide = function () {
        this.element.style.display = 'none';
        return this;
    }

    this.src = function (src) {
        this.element.src = src;
        return this;
    }

    this.show = function () {
        this.element.style.display = 'block';
        return this;
    }
    this.style = function (styl) {
        this.element.style = styl;
        return this;
    }
    this.className = function (className) {
        this.element.className = className;
        return this;
    }
    this.onclick = function (fn) {
        this.element.onclick = fn;
        return this;
    }
    this.html = function (htmlValue) {
        this.element.innerHTML = htmlValue;
        return this;
    }
}
const builder = {

    create: function (name) {
        return new ElementBuilder(name)
    }
}



// const pro = new Product(1,'Queen Panel Bed',2000,'../../images/product-1.jpeg');
// const pro2 = new Product(2,'King Panel Bed',2000,'../../images/product-2.jpeg');
// const pro3 = new Product(3,'single Panel Bed',2000,'../../images/product-3.jpeg');
// const pro4 = new Product(4,'Twin Panel Bed',2000,'../../images/product-4.jpeg');

const app = new ProductList();

data = JSON.parse(data)
let items = data.items
items.forEach(item => {

    app.add(new Product(item.sys.id,item.fields.title,item.fields.price,item.fields.image.fields.file.url))
})
app.paint();