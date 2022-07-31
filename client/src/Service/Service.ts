import {
  car,
  carStatus,
  createCar,
  deleteCar,
  getCar,
  getCars,
  startEngine,
  switchToDrive,
  updateCar,
} from '../api/api';
import { generateRandomCars } from '../utils/utils';
import rondon from '../assets/audio/rondondon.mp3';

type subscribeRenderCars = (cars: car[]) => void;
type subscribeCarsCount = (carsCount: string) => void;
type subscribeCarUpdate = (data: { color: string; name: string }) => void;
type subscribePagination = (data: { curPage: number; pageCount: number }) => void;
type subscribersWinRace = (data: { time: number; name: string }) => void;
type subscribeRace = (data: { race: boolean; result: carStatus }) => Promise<500 | 200>;

type ICalbackData =
  | car[]
  | string
  | number
  | boolean
  | { race: boolean; result: carStatus }
  | { color: string; name: string }
  | { curPage: number; pageCount: number }
  | { time: number; name: string };

export enum EEVents {
  renderCars = 'renderCars',
  carsCount = 'carsCount',
  selectCar = 'selectCar',
  pagination = 'pagination',
  raceStart = 'startRace',
  winRace = 'winRace',
}

type startRaceConfig = Promise<{
  status: number;
  result: carStatus;
}>;

export class Service {
  sound = new Audio(rondon);
  private winnerTime = 0;
  carsOnCurPage: car[] | undefined;
  // Массивы с подписчиками
  private subscribersRender: Array<subscribeRenderCars> = [];
  private subscribersCarCount: Array<subscribeCarsCount> = [];
  private subscribersSelectCar: Array<subscribeCarUpdate> = [];
  private subscribersPagination: Array<subscribePagination> = [];
  private subscribersRace: Array<subscribeRace> = [];
  private subscribersWin: Array<subscribersWinRace> = [];
  private startRaceConfig: Array<startRaceConfig> = []; // Массив промисов, который вернёт velocity\distance;
  private selectedCar: number | undefined; // Id выбранной машины
  private pageCount = 1;
  private curPage = 1;
  private countCarsOnPage;
  private baseUrl;

  constructor(countCarsOnPage: number, baseUrl: string) {
    this.carsOnCurPage = [];
    this.countCarsOnPage = countCarsOnPage;
    this.baseUrl = baseUrl;
    this.getCars();
  }

  subscribe(
    event: EEVents,
    callback:
      | subscribeRenderCars
      | subscribeCarsCount
      | subscribeCarUpdate
      | subscribePagination
      | subscribeRace
      | subscribersWinRace
  ) {
    switch (event) {
      case EEVents.carsCount:
        this.subscribersCarCount.push(callback as subscribeCarsCount);
        break;
      case EEVents.pagination:
        this.subscribersPagination.push(callback as subscribePagination);
        break;
      case EEVents.renderCars:
        this.subscribersRender.push(callback as subscribeRenderCars);
        break;
      case EEVents.selectCar:
        this.subscribersSelectCar.push(callback as subscribeCarUpdate);
        break;
      case EEVents.raceStart:
        this.subscribersRace.push(callback as subscribeRace);
        break;
      case EEVents.winRace:
        this.subscribersWin.push(callback as subscribersWinRace);
        break;
    }
  }

  private async dispatchEvent(event: EEVents, data: ICalbackData) {
    switch (event) {
      case EEVents.carsCount:
        this.subscribersCarCount.forEach((callback) => callback(data as string));
        break;
      case EEVents.pagination:
        this.subscribersPagination.forEach((callback) => callback(data as { curPage: number; pageCount: number }));
        break;
      case EEVents.renderCars:
        this.subscribersRender.forEach((callback) => callback(data as car[]));
        break;
      case EEVents.selectCar:
        this.subscribersSelectCar.forEach((callback) => callback(data as { color: string; name: string }));
        break;
      case EEVents.raceStart:
        // eslint-disable-next-line no-case-declarations
        const res = await Promise.all(this.startRaceConfig);
        for (let i = 0; i < this.subscribersRace.length; i += 1) {
          this.subscribersRace[i]!({ race: data as boolean, result: res[i]!.result! });
        }
        break;
      case EEVents.winRace:
        this.subscribersWin.forEach((callback) => callback(data as { time: number; name: string }));
        break;
    }
  }

  private async getCars() {
    const res = await getCars(this.countCarsOnPage, this.curPage, this.baseUrl);
    if (res !== null) {
      this.subscribersRace = [];
      this.carsOnCurPage = res.data;
      this.pageCount = Math.ceil(Number(res.pageCount) / this.countCarsOnPage);
      this.dispatchEvent(EEVents.renderCars, res.data);
      this.dispatchEvent(EEVents.carsCount, res.pageCount);
      this.dispatchEvent(EEVents.pagination, { curPage: this.curPage, pageCount: this.pageCount });
    }
  }

  async addCar(data: car) {
    await createCar(data).then(() => this.getCars());
  }

  async removeCar(id: number) {
    await deleteCar(id).then(() => this.getCars());
    if (this.curPage > 1 && this.carsOnCurPage?.length === 0) {
      this.prevPage();
    }
  }

  async updateCar(car: car) {
    if (this.selectedCar) {
      car.id = this.selectedCar;
      await updateCar(car);
      this.getCars();
    }
  }

  async generateCars() {
    generateRandomCars(100).forEach((car) => this.addCar(car));
  }

  async selectCar(id: number) {
    this.selectedCar = id;
    const car = await getCar(id, this.baseUrl);
    if (car) this.dispatchEvent(EEVents.selectCar, { color: car.color, name: car.name });
  }

  async nextPage() {
    if (this.curPage < this.pageCount) {
      this.curPage += 1;
      await this.getCars();
      this.dispatchEvent(EEVents.pagination, { curPage: this.curPage, pageCount: this.pageCount });
    }
  }

  async prevPage() {
    if (this.curPage > 1) {
      this.curPage -= 1;
      await this.getCars();
      this.dispatchEvent(EEVents.pagination, { curPage: this.curPage, pageCount: this.pageCount });
    }
  }

  async startCarEngine(carId: number) {
    const speed = await startEngine(carId);
    return speed;
  }

  async switchToDrive(carId: number) {
    return await switchToDrive(carId);
  }

  async startRace() {
    this.sound.play();
    this.winnerTime = 0;
    if (this.carsOnCurPage) {
      this.startRaceConfig = this.carsOnCurPage.map(async (el) => await this.startCarEngine(el.id!));
    }
    this.dispatchEvent(EEVents.raceStart, true);
  }

  resetRace() {
    this.sound.pause();
    this.sound.currentTime = 0;
    this.dispatchEvent(EEVents.raceStart, false);
  }

  winRace(id: number, time: number, name: string) {
    if (this.winnerTime === 0) {
      this.winnerTime = time;
      this.dispatchEvent(EEVents.winRace, { time: time / 1000, name: name });
      console.log(`car ${id} time ${time}`);
    }
  }
}
