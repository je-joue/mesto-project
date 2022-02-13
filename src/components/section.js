export default class Section {
  constructor({ renderer }, selector) {
    // this.items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.append(element);
  }

  // _clear() {
  //   this._container.innerHTML = '';
  // }
}
