/* SystemJS module definition */
declare var nodeModule: NodeModule;
interface NodeModule {
  id: string;
}
declare const SystemJS;
declare var window: Window;
interface Window {
  process: any;
  require: any;
}
