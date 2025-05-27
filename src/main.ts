import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent }         from './app/app.component';
import { provideHttpClient }    from '@angular/common/http';
import { provideRouter }        from '@angular/router';
import { provideFirebaseApp }   from '@angular/fire/app';
import { initializeApp }        from 'firebase/app';
import { provideAuth }          from '@angular/fire/auth';
import { getAuth }              from 'firebase/auth';
import { routes }               from './app/app.routes';
import { environment }          from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ]
})
.catch(err => console.error(err));
