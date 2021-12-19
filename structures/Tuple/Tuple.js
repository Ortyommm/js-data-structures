export default class Tuple {
  constructor(...elements) {
    this._length = elements.length;
    this._array = new Proxy(elements, {
      set: (target, prop, value, receiver) => {
        console.log(receiver === this._array);
        if (receiver === this._array)
          throw new TypeError(`Invalid method. Tuple can't change its length`);
        if (!Number.isInteger(+prop)) {
          checkSpecialProps(prop);
          throw new TypeError(`Index must be an integer. Received "${prop}"`);
        }
        checkPropIndex(prop, this._length);
        target[prop] = value;
        return true;
      },
      get: (target, prop, receiver) => {
        checkSpecialProps(prop);
        checkPropIndex(prop, this._length);
        return target[prop];
      },
      deleteProperty() {
        throw new TypeError(`Tuple elements can't be deleted`);
      },
    });
    return this._array;
  }
}

function checkSpecialProps(prop) {
  switch (prop) {
    case "_array":
    case "_length":
      throw new TypeError(`Property ${prop} is private`);
  }
}

function checkPropIndex(prop, length) {
  console.log({ prop, length });
  if (+prop > length - 1) {
    throw new RangeError(`The last index of the tuple is ${length - 1}`);
  }
}
