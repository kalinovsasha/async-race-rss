interface IListener {
  event: string;
  callback: (...params: string[]) => void;
}

export class Observer {
  private listeners: Array<IListener> = [];

  addListener(event: string, callback: (...params: string[]) => void): void {
    this.listeners.push({ event, callback });
  }

  dispatchEvent(event: string, ...params: string[]): void {
    this.listeners.filter((it) => it.event === event).forEach((it) => it.callback(...params));
  }
}
