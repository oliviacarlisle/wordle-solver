export class ProgressBar {
  private progress: number;
  private total: number;
  private barLength: number;
  private filled: string;
  private empty: string;
  private startTime: number;

  constructor(total: number, barLength: number = 40) {
    this.progress = 0;
    this.total = total;
    this.barLength = barLength;
    this.filled = '█';
    this.empty = '░';
    this.startTime = Date.now();
  }

  update(current: number): void {
    this.progress = current;
    const percentage = (this.progress / this.total) * 100;
    const filledLength = Math.round(
      (this.barLength * this.progress) / this.total,
    );
    const emptyLength = this.barLength - filledLength;

    const elapsedTime = (Date.now() - this.startTime) / 1000;
    const rate = this.progress / elapsedTime;
    const estimatedTime = (this.total - this.progress) / rate;

    const bar =
      this.filled.repeat(filledLength) + this.empty.repeat(emptyLength);
    const percentageText = percentage.toFixed(1);
    const timeRemaining = estimatedTime.toFixed(1);

    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(
      `Progress: |${bar}| ${percentageText}% | ${this.progress}/${this.total} | ETA: ${timeRemaining}s`,
    );

    if (this.progress === this.total) {
      process.stdout.write('\n');
    }
  }
}
