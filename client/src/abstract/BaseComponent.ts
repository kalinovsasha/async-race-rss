export class BaseComponent {
  readonly element: HTMLElement;
  root: HTMLElement;

  constructor(root: HTMLElement, tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
    this.element = document.createElement(tag);
    if (styles.length) {
      this.element.classList.add(...styles);
    }
    this.root = root;
    this.root.append(this.element);
  }
  remove() {
    this.element.remove();
  }
  add() {
    this.root.append(this.element);
  }
}
