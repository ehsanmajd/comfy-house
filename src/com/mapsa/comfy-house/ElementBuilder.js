function ElementBuilder(name) {
    this.element = document.createElement(name);
  
    this.text = function (text) {
      this.element.textContent = text;
      return this;
    };

    this.id = function (id) {
      this.element.id = id;
      return this;
    };
  
    this.type = function () {
      this.element.type = type;
      return this;
    };
  
    this.placeholder = function () {
      this.element.placeholder = text;
      return this;
    };
  
    this.build = function () {
      return this.element;
    };
  
    this.appendTo = function (parent) {
      if (parent instanceof ElementBuilder) {
        parent.build().appendChild(this.element);
      } else {
        parent.appendChild(this.element);
      }
      return this;
    };
  
    this.className = function (className) {
      this.element.className = className;
      return this;
    };
  
    this.onclick = function (fn) {
      this.element.onclick = fn;
      return this;
    };
  
    this.html = function (htmlvalue) {
      this.element.innerHTML = htmlvalue;
      return this;
    };
  
    this.value = function (value) {
      this.element.value = value;
      return this;
    };
  }
  
  const builder = {
    create: function (name) {
      return new ElementBuilder(name);
    },
  };
  