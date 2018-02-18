export interface ICommand {
  title: string;
  description?: string;
  run(): void;
  onSelect?(): void;
  onDeselect?(): void;
}

export class Command implements ICommand {
  title: string;
  description: string;
  element?: HTMLElement;
  onSelect?(): void;
  onDeselect?(): void;
  private _run?(): void;

  constructor({ title, description = '', run, onSelect, onDeselect }: ICommand) {
    this.title = title;
    this.description = description;
    this._run = run;
    this.onSelect = onSelect;
    this.onDeselect = onDeselect;
  }

  run() {
    if (typeof this._run === 'function') {
      this._run();
    } else {
      throw new Error('No run method provided.');
    }
  }

  isAvailable() {
    return true;
  }

  matches(input: string) {
    const title = this.title.toLowerCase();
    const description = this.description.toLowerCase();
    const inputRegex = input.toLowerCase().split('').join('.*');
    if (new RegExp(inputRegex).test(title)) {
      return 10;
    }

    if (new RegExp(inputRegex).test(description)) {
      return 5;
    }

    return 0;
  }
}
