interface Listener {
  name: string;
  callback: (...params: string[]) => void;
}

export class Observer {
  private listeners: Array<Listener> = [];

  addListener(name: string, callback: (...params: string[]) => void): void {
    this.listeners.push({ name, callback });
  }

  dispatch(name: string, ...params: string[]): void {
    this.listeners.filter((it) => it.name === name).forEach((it) => it.callback(...params));
  }
}
