import { BaseComponent } from '../../abstract/BaseComponent';
import './Car.scss';
import { carImage } from './carImage';
import svg from '../../assets/img/racing_flag.svg';
import { EEVents, Service } from '../../Service/Service';
import { carStatus } from '../../api/api';

export class Car extends BaseComponent {
  private animation: string | number | NodeJS.Timer | undefined;
  private carName: string;
  private carId: number;
  private car: BaseComponent;
  private trackContainer: BaseComponent;
  private engineStartBtn;
  private engineStopBtn;
  private service;
  private isRace = false;
  constructor(root: HTMLElement, service: Service, carName: string, carId: number, carColor: string) {
    super(root, 'div', ['carContainer']);
    this.service = service;
    this.carId = carId;
    this.carName = carName;
    const controls = new BaseComponent(this.element, 'div', ['carControls']);
    const selectBtn = new BaseComponent(controls.element, 'button', ['carControls__select']);
    selectBtn.element.textContent = 'Select';
    const removeBtn = new BaseComponent(controls.element, 'button', ['carControls__remove']);
    removeBtn.element.textContent = 'Remove';
    const carNameEl = new BaseComponent(controls.element, 'h4', ['carControls__carName']);
    carNameEl.element.textContent = carName;
    const engine = new BaseComponent(this.element, 'div', ['engineControls']);
    this.engineStartBtn = new BaseComponent(engine.element, 'button', ['engineControls__start']);
    this.engineStartBtn.element.textContent = 'A';
    this.engineStopBtn = new BaseComponent(engine.element, 'button', [
      'engineControls__stop',
      'engineControls_disabled',
    ]);
    this.engineStopBtn.element.textContent = 'B';
    this.trackContainer = new BaseComponent(this.element, 'div', ['track']);
    this.car = new BaseComponent(this.trackContainer.element, 'div', ['car']);
    this.car.element.innerHTML = carImage(carColor, 'car-image-svg');
    const finishFlag = new BaseComponent(this.trackContainer.element, 'img', ['finishFlag']);
    finishFlag.element.setAttribute('src', svg);

    removeBtn.element.onclick = () => service.removeCar(this.carId);
    selectBtn.element.onclick = () => service.selectCar(this.carId);
    this.engineStartBtn.element.onclick = async () => {
      this.engineStartBtn.element.classList.add('engineControls_disabled');
      const data = await this.service.startCarEngine(this.carId);
      this.startEngine(data.result);
    };
    this.engineStopBtn.element.onclick = async () => {
      await service.stopCarEngine(carId);
      this.reset();
    };
    service.subscribe(EEVents.raceStart, this.raceHandler.bind(this));
  }
  private async startEngine(result: carStatus) {
    this.engineStopBtn.element.classList.remove('engineControls_disabled');
    this.engineStartBtn.element.classList.add('engineControls_disabled');
    const time = result.distance / result.velocity; // Miliseconds
    const v = ((this.trackContainer.element.clientWidth - 110) / time) * 20;
    let ofset = 0;
    this.animation = setInterval(() => {
      this.car.element.style.left = `${ofset}px`;
      if (ofset < this.trackContainer.element.clientWidth - 110) {
        ofset += v;
      } else {
        if (this.isRace) this.service.winRace(this.carId, time, this.carName);
        clearInterval(this.animation);
      }
    }, 20);
    const status = await this.service.switchToDrive(this.carId);
    if (status === 500) {
      this.stopEngine();
      return 500;
    }
    return 200;
  }

  private stopEngine() {
    clearInterval(this.animation);
  }

  private reset() {
    this.engineStopBtn.element.classList.add('engineControls_disabled');
    clearInterval(this.animation);
    this.engineStartBtn.element.classList.remove('engineControls_disabled');
    this.car.element.style.left = `0px`;
  }

  async raceHandler(data: { race: boolean; result: carStatus }) {
    if (data.race) {
      this.isRace = true;
      return await this.startEngine(data.result);
    } else {
      this.reset();
      this.isRace = false;
      return 200;
    }
  }
}

// Время находим 500 000 / 50(скорость от сервера) = 10000 в нашем случае милисекунд
// Относительно трассы скорость считаем так element.clientWidth / 10000 = пикселей в милисекунд
// Можно умножить на 10 т обновлять раз в 10
