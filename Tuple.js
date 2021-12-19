export default class Tuple {
  constructor(...elements) {
    this._length = elements.length;
    this._array = new Proxy(elements, {
      set: (target, prop, value, receiver) => {
        if (!Number.isInteger(+prop)) {
          // this.checkSpecialProps(prop);
          switch (prop) {
            case "pop":
            case "unshift":
            case "push":
            case "shift":
              throw new TypeError(`Tuple can't change length`);
          }
          throw new TypeError(`Index must be an integer. Received "${prop}"`);
        }

        if (+prop > this._length - 1) {
          throw new RangeError(
            `The last index of the tuple is ${this._length - 1}`
          );
        }
        target[prop] = value;
        return true;
      },
      get(target, prop, receiver) {
        console.log({ this: this });
        // this.checkSpecialProps(prop);
        return target[prop];
      },
      deleteProperty() {
        throw new TypeError(`Tuple elements can't be deleted`);
      },
    });
    return this._array;
  }

  checkSpecialProps = (prop) => {
    switch (prop) {
      case "_array":
      case "_length":
        throw new TypeError(`Property ${prop} is private`);
    }
  };
}
