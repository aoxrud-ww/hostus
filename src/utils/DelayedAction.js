
export default class DelayedAction {
  constructor({ delay, step, onAction, onTick, onCancel, onCleanup, cleanupOnAction }) {
    this.delay = delay || 1000;
    this.step = step || 3;
    this.onAction = onAction || (() => {});
    this.onTick = onTick || (() => {});
    this.onCancel = onCancel || (() => {});
    this.onCleanup = onCleanup || (() => {});
    this.cleanupOnAction = cleanupOnAction;

    this.start();
  }

  start() {
    this.onTick(this.step);



    this.timer = setTimeout(() => {
      if(this.step > 0) {
        this.step--;
        this.start();
      } else {
        this.onAction();

        if(this.cleanupOnAction) {
          this.onCleanup();
        }
      }
    }, this.delay);
  }

  cancel(options = {broadcast: true}) {
    this.onCancel();
    clearTimeout(this.timer);

    if(options.broadcast === true) {
      setTimeout(() => {
        this.onCleanup();
      }, this.delay);
    }
  }
}