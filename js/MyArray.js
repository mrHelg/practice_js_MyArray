/* data */
function MyArray() {
  this.length = 0;
  // for (let i = 0; i < arguments.length; i++) {
  this.push(...arguments);
  // }
}

/* logic */
function MyArrayProto() {
  this.push = function () {
    for (let i = 0; i < arguments.length; i++) {
      this[this.length++] = arguments[i];
    }
    return this.length;
  };

  this.pop = function () {
    if (this.length === 0) {
      return;
    }
    const item = this[--this.length];
    delete this[this.length];
    return item;
  };

  this.forEach = function (func) {
    if (typeof func !== 'function') {
      throw new SyntaxError(func + ' is not a function');
    }
    for (let i = 0; i < this.length; i++) {
      func(this[i], i, this);
    }
  };

  this.some = function (func) {
    if (typeof func !== 'function') {
      throw new SyntaxError(func + ' is not a function');
    }
    for (let i = 0; i < this.length; i++) {
      if (func(this[i], i, this)) {
        return true;
      }
    }
    return false;
  };

  this.every = function (func) {
    if (typeof func !== 'function') {
      throw new SyntaxError(func + ' is not a function');
    }
    for (let i = 0; i < this.length; i++) {
      if (func(this[i], i, this) === false) {
        return false;
      }
    }
    return true;
  };

  this.filter = function (func) {
    if (typeof func !== 'function') {
      throw new SyntaxError(func + ' is not a function');
    }
    const result = new MyArray();
    for (let i = 0; i < this.length; i++) {
      if (func(this[i], i, this)) {
        result.push(this[i]);
      }
    }
    return result;
  };

  // My methods
  this.unshift = function () {
    const offset = arguments.length;
    if (offset > 0) {
      for (let i = this.length - 1; i >= 0; i--) {
        this[i + offset] = this[i];
      }
      for (let i = 0; i < offset; i++) {
        this[i] = arguments[i];
      }
    }
    return (this.length += offset);
  };

  this.shift = function () {
    if (this.length === 0) {
      return;
    }
    const item = this[0];
    for (let i = 0; i < this.length - 1; i++) {
      this[i] = this[i + 1];
    }
    this.length--;
    delete this[this.length];
    return item;
  };

  this.concat = function () {
    const result = new MyArray();
    this.forEach((item) => result.push(item));
    if (arguments.length > 0) {
      for (let i = 0; i < arguments.length; i++) {
        const arg = arguments[i];
        if (arg instanceof MyArray) {
          arg.forEach((item) => result.push(item));
        } else {
          result.push(arg);
        }
      }
    }
    return result;
  };

  this.reverse = function () {
    if (this.length > 1) {
      for (let i = 0; i < Math.floor(this.length / 2); i++) {
        const item = this[i];
        this[i] = this[this.length - 1 - i];
        this[this.length - 1 - i] = item;
      }
    }
    return this;
  };

  this.map = function (func) {
    if (typeof func !== 'function') {
      throw new SyntaxError(func + ' is not a function');
    }
    const result = new MyArray();
    if (this.length !== 0) {
      this.forEach((item) => result.push(func(item)));
    }
    return result;
  };
}

/* Prototype */
MyArray.prototype = new MyArrayProto();
