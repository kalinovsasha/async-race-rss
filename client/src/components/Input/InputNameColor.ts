import { BaseComponent } from '../../abstract/BaseComponent';

export class inputCarColor extends BaseComponent {
  inputTxt;
  inputColor;
  btn;

  constructor(root: HTMLElement, styles: string[], content: string) {
    super(root, 'div', styles);
    this.inputTxt = new BaseComponent(this.element, 'input', [`${styles[0]}__inputTxt`]);
    this.inputTxt.element.setAttribute('type', 'txt');
    this.inputColor = new BaseComponent(this.element, 'input', [`${styles[0]}__inputColor`]);
    this.inputColor.element.setAttribute('type', 'color');
    this.btn = new BaseComponent(this.element, 'button', [`${styles[0]}__btnCreate`, 'btn1']);
    this.btn.element.textContent = content;
  }
}
