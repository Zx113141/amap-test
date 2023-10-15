

class EditorService {
  instanceId: string = '';
  canvas: Nullable<HTMLDivElement> = null;
  fn: (params?: any) => void
  constructor(instance: string, fn: ((params: any) => void)) {
    this.instanceId = instance;
    this.fn = fn
  }

  init() {
    // 不需要拖拽事件
    // const that = this
    // that.canvas = document.getElementById(this.instanceId) as HTMLDivElement;
    // that.canvas.ondragover = function (e: DragEvent) {
    //   e.preventDefault();
    // };
    // that.canvas.ondragenter = function (e: DragEvent) {
    //   e.preventDefault();
    // };
    // that.canvas.ondrop = function (e: DragEvent) {
    //   const { offsetX: x, offsetY: y } = e
    //   that.fn({ x, y })
    // }

  }
}

export default EditorService;
