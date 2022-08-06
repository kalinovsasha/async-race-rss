type subscribersRouter = (data: string) => void;
export class Router {
  private subscribers: subscribersRouter[] = [];
  constructor() {
    window.addEventListener('hashchange', (e) => {
      const data = e.newURL.slice(e.newURL.indexOf('#') + 1);
      this.dispatchEvent(data);
    });
    setTimeout(() => {
      this.dispatchEvent(document.location.hash.slice(1));
    }, 5);
  }

  subscribe(callback: (data: string) => void) {
    this.subscribers.push(callback);
  }

  dispatchEvent(data: string) {
    console.log(document.location.hash.slice(1));
    this.subscribers.forEach((fn) => fn(data));
  }
}
