import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      timeOut: 2500,
      progressBar: false,
      closeButton: true,
      tapToDismiss: true,
      newestOnTop: true,
      extendedTimeOut: 2500
    })
  ]
}).catch(err => console.error(err));
