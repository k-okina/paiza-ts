type Callback = (line: string[]) => void

class WhenQueuedStringLinesExecuteCallbackFunction {
  private lines: string[] = []
  constructor(private callback: Callback, private lineLimit: number) {
  }

  public enqueue(line: string) {
    this.lines.push(line)
    this.hook()
  }

  public hook() {
    if (this.lines.length === this.lineLimit) {
      this.callback(this.lines)
    }
  }
}

function PaizaInputer(callback: Callback, lineLimit: number = 1) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  const queue = new WhenQueuedStringLinesExecuteCallbackFunction(callback, lineLimit)

  require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  }).on('line', (line: string) => queue.enqueue(line));
}

export default PaizaInputer
