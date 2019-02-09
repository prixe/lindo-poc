import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { NgRedux } from '@angular-redux/store';
import { setRemindersEnabled } from '../../shared/store/settings/settings.action';
import { AppState } from '../../shared/store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService,
              public store: NgRedux<AppState>) {

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
}
