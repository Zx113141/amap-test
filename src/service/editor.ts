class EditorService {
  instanceId: string = '';
  canvas: Nullable<HTMLDivElement> = null;
  constructor(instance: string) {
    this.instanceId = instance;
  }

  init() {
    this.canvas = document.getElementById(this.instanceId) as HTMLDivElement;
    this.canvas.ondragover = function (e: DragEvent) {
      e.preventDefault();
    };
    this.canvas.ondragenter = function (e: DragEvent) {
      e.preventDefault();
    };
  }
}

export default EditorService;
