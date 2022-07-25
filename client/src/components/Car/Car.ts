import { BaseComponent } from '../../abstract/BaseComponent';
import './Car.scss';
import { carImage } from './carImage';
import svg from '../../assets/img/racing_flag.svg';

export default class Car extends BaseComponent {
  carName: string;
  constructor(root: HTMLElement, carName: string, carColor: string) {
    super(root, 'div', ['carContainer']);
    this.carName = carName;
    const controls = new BaseComponent(this.element, 'div', ['carControls']);
    const selectBtn = new BaseComponent(controls.element, 'button', ['carControls__select']);
    selectBtn.element.textContent = 'Select';
    const removeBtn = new BaseComponent(controls.element, 'button', ['carControls__remove']);
    removeBtn.element.textContent = 'Remove';
    const carNameEl = new BaseComponent(controls.element, 'h4', ['carControls__carName']);
    carNameEl.element.textContent = carName;
    const engine = new BaseComponent(this.element, 'div', ['engineControls']);
    const engineStartBtn = new BaseComponent(engine.element, 'button', ['engineControls__start']);
    engineStartBtn.element.textContent = 'A';
    const engineStopBtn = new BaseComponent(engine.element, 'button', ['engineControls__stop']);
    engineStopBtn.element.textContent = 'B';

    const trackContainer = new BaseComponent(this.element, 'div', ['track']);
    const car = new BaseComponent(trackContainer.element, 'div', ['car']);
    car.element.innerHTML = carImage(carColor);
    const finishFlag = new BaseComponent(trackContainer.element, 'img', ['finishFlag']);
    finishFlag.element.setAttribute('src', svg);
  }
}
