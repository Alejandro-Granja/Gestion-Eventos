import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService, Event } from './services/event.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h2 class="mb-4">Mis Eventos</h2>

      <!-- Formulario Añadir/Editar -->
      <form (ngSubmit)="saveEvent()" class="row g-2 mb-3">
        <div class="col-md-2">
          <input
            [(ngModel)]="event.title"
            name="title"
            class="form-control"
            placeholder="Título"
            required>
        </div>
        <div class="col-md-3">
          <input
            [(ngModel)]="event.description"
            name="description"
            class="form-control"
            placeholder="Descripción">
        </div>
        <div class="col-md-2">
          <input
            [(ngModel)]="event.date"
            name="date"
            type="date"
            class="form-control"
            required>
        </div>
        <div class="col-md-2">
          <input
            [(ngModel)]="event.location"
            name="location"
            class="form-control"
            placeholder="Lugar"
            required>
        </div>
        <div class="col-md-1">
          <input
            [(ngModel)]="event.capacity"
            name="capacity"
            type="number"
            class="form-control"
            placeholder="Cupo"
            required>
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary w-100">
            {{ event.id ? 'Actualizar' : 'Agregar' }}
          </button>
        </div>
      </form>

      <!-- Tabla de Eventos -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Lugar</th>
            <th>Cupo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let e of events">
            <td>{{ e.id }}</td>
            <td>{{ e.title }}</td>
            <td>{{ e.description }}</td>
            <td>{{ e.date }}</td>
            <td>{{ e.location }}</td>
            <td>{{ e.capacity }}</td>
            <td>
              <button
                class="btn btn-warning btn-sm me-2"
                (click)="edit(e)">
                Editar
              </button>
              <button
                class="btn btn-danger btn-sm"
                (click)="remove(e.id!)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  event: Event = {
    user_uid: '',
    title: '',
    description: '',
    date: '',
    location:'',
    capacity: 0
  };

  constructor(
    private svc: EventService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.load();
  }

  /** Cargar eventos del backend */
  load() {
    this.svc.getEvents(this.auth.uid).subscribe(data => {
      this.events = data;
    });
  }

  

  /** Guardar (añadir o actualizar) */
  saveEvent() {
    this.event.user_uid = this.auth.uid;
    const op$ = this.event.id
      ? this.svc.updateEvent(this.event)
      : this.svc.addEvent(this.event);

    op$.subscribe(() => {
      this.event = {
        user_uid: '',
        title: '',
        description: '',
        date: '',
        location:'',
        capacity: 0
      };
      this.load();
    });
  }

  /** Editar evento */
  edit(e: Event) {
    this.event = { ...e };
  }

  /** Eliminar evento */
  remove(id: number) {
    this.svc.deleteEvent(id, this.auth.uid).subscribe(() => this.load());
  }
}
