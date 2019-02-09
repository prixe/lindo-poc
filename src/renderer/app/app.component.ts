import { Compiler, Component, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgRedux } from '@angular-redux/store';
import { setRemindersEnabled } from '../../shared/store/settings/settings.action';
import { AppState } from '../../shared/store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('content', {read: ViewContainerRef}) content: ViewContainerRef;

  constructor(private translate: TranslateService,
              public store: NgRedux<AppState>,
              private _compiler: Compiler,
              private _injector: Injector) {

    translate.setDefaultLang('en');

    store.dispatch(setRemindersEnabled(false));
    store.dispatch(setRemindersEnabled(true));

    store.subscribe(() => console.log(store.getState()));

    /*if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }*/
  }

  ngAfterViewInit() {
    this.loadPlugins();
  }

  private async loadPlugins() {
    // import external module bundle
    const module = await SystemJS.import('assets/plugins/plugin-test.bundle.js');

    const moduleFactory = await this._compiler
      .compileModuleAsync<any>(module["PluginTestModule"]);

    // resolve component factory
    const moduleRef = moduleFactory.create(this._injector);

    //get the custom made provider name 'plugins'
    const componentProvider = moduleRef.injector.get('plugins');

    //from plugins array load the component on position 0
    const componentFactory = moduleRef.componentFactoryResolver
      .resolveComponentFactory<any>(
        componentProvider[0][0].component
      );

    // compile component
    var pluginComponent = this.content.createComponent(componentFactory);
  }
}
