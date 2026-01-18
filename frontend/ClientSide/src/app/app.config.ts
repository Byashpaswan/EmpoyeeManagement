import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection ,importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { httpErrorinterceptorInterceptor } from './global/http-errorinterceptor-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      preventDuplicates: true
    }),
    provideHttpClient(withInterceptorsFromDi(),withInterceptors([httpErrorinterceptorInterceptor])),
     importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      ToastrModule.forRoot(),
     )
  ]
};
