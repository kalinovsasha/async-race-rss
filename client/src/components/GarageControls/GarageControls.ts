import { BaseComponent } from '../../abstract/BaseComponent';
import { EEVents, Service } from '../../Service/Service';
import { inputCarColor } from './../Input/InputNameColor';
import './GarageControls.scss';

export class GarageControls extends BaseComponent {
  private race;
  private reset;
  constructor(root: HTMLElement, service: Service, updateData: { color: string; text: string }) {
    super(root, 'div', ['garage__controls']);
    const inputCreate = new inputCarColor(
      this.element,
      service.addCar.bind(service),
      [`create-car`, 'inputContainer'],
      {
        btnTxt: 'Create',
        color: '#000000',
        text: '',
      }
    );
    const inputUpdate = new inputCarColor(
      this.element,
      service.updateCar.bind(service),
      [`update-car`, 'inputContainer'],
      {
        btnTxt: 'Update',
        color: updateData.color,
        text: updateData.text,
      }
    );
    const raceControls = new BaseComponent(this.element, 'div', ['race-control']);
    this.race = new BaseComponent(raceControls.element, 'button', ['btn']);
    this.race.element.textContent = 'Race';
    this.reset = new BaseComponent(raceControls.element, 'button', ['btn']);
    this.reset.element.textContent = 'Reset';
    const generate = new BaseComponent(raceControls.element, 'button', ['btnLong']);
    generate.element.textContent = 'Generate cars';

    service.subscribe(EEVents.selectCar, inputUpdate.changeState.bind(inputUpdate));
    generate.element.onclick = () => service.generateCars();
    this.race.element.onclick = () => {
      this.race.element.classList.add('garage_disable');
      this.reset.element.classList.add('garage_disable');
      service.startRace();
    };
    this.reset.element.onclick = () => {
      this.race.element.classList.remove('garage_disable');
      service.resetRace();
    };
  }

  resetStyles() {
    this.reset.element.classList.remove('garage_disable');
  }
}
