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
    for (let i = 0; i < this.length; i++) {
      func(this[i], i, this);
    }
  };

  this.some = function (func) {
    for (let i = 0; i < this.length; i++) {
      if (func(this[i], i, this)) {
        return true;
      }
    }
    return false;
  };

  this.every = function (func) {
    for (let i = 0; i < this.length; i++) {
      if (func(this[i], i, this) === false) {
        return false;
      }
    }
    return true;
  };

  this.filter = function (func) {
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
    for (let i = 0; i < this.length-1; i++) {
      this[i] = this[i+1];
    }
    this.length--;
    delete this[this.length];
    return item;
  };

  this.concat = function () {
    return;
  };

  this.reverse = function () {
    return;
  };

  this.map = function () {
    return;
  };
}

/* Prototype */
MyArray.prototype = new MyArrayProto();
