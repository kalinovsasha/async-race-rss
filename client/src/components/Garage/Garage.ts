import { BaseComponent } from '../../abstract/BaseComponent';
import { Car } from '../Car/Car';
import './Garage.scss';
import { Service } from '../../Service/Service';
import { car } from '../../api/api';

export class Garage extends BaseComponent {
  private service: Service;
  constructor(root: HTMLElement, service: Service, cars?: car[] | null) {
    super(root, 'div', ['garage']);
    this.service = service;
    if (cars) this.rendrCars(cars);
  }

  rendrCars(cars: car[]) {
    this.element.innerHTML = ``;
    if (cars) {
      for (let i = 0; i < cars.length; i += 1) {
        new Car(this.element, this.service, cars[i]!.name, cars[i]!.id!, cars[i]!.color);
      }
    }
  }
}
