import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import {NgRedux} from "@angular-redux/store";
import configureStore from "../../shared/store/configureStore";
import {setRemindersEnabled} from "../../shared/actions/settings";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService,
              public store: NgRedux<any>) {

    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    store.provideStore(configureStore({}, 'renderer'));

    store.dispatch(setRemindersEnabled(false));

    /*if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }*/
  }
}
