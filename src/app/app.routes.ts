import type { Routes }           from '@angular/router';
import { EventListComponent }    from './event-list.component';
import { MapComponent }          from './map.component';
import { StatsComponent }        from './stats.component';
import { LoginComponent }        from './login.component';
import { RegisterComponent }     from './register.component';
import { CalendarComponent }     from './calendar/Calendar.Component';

export const routes = [
  { path: '',         redirectTo: 'events', pathMatch: 'full' },
  { path: 'events',   component: EventListComponent },
  { path: 'map',      component: MapComponent },
  { path: 'stats',    component: StatsComponent },
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },
   { path: 'calendar',component: CalendarComponent },
  { path: '**',       redirectTo: 'events', pathMatch: 'full' },
] satisfies Routes;
