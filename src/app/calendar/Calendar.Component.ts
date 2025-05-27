import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { FormsModule } from '@angular/forms';
import { EventService, Event } from '../services/event.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FormsModule],
  template: `
    <div class="calendar-container">
      <form (ngSubmit)="addEvento()" class="form-inline">
        <input type="text" [(ngModel)]="nuevoTitulo" name="titulo" placeholder="Título" required class="input-titulo"/>
        <input type="date" [(ngModel)]="nuevaFecha" name="fecha" required class="input-fecha"/>
        <button type="submit" class="btn-agregar">Agregar Evento</button>
      </form>

      <full-calendar [options]="calendarOptions"></full-calendar>
    </div>
  `,
  styles: [`
    .calendar-container {
      max-width: 700px;
      margin: auto;
      padding: 20px;
      background: #222831;
      border-radius: 12px;
      color: #eeeeee;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    form.form-inline {
      margin-bottom: 15px;
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: center;
    }
    .input-titulo, .input-fecha {
      padding: 8px 10px;
      border-radius: 6px;
      border: none;
      font-size: 14px;
    }
    .btn-agregar {
      background-color: #00adb5;
      color: #fff;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }
    .btn-agregar:hover {
      background-color: #028f94;
    }
  `]
})
export class CalendarComponent implements OnInit {
  nuevoTitulo = '';
  nuevaFecha = '';
  eventos: { title: string, start: string }[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    editable: false
  };

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.eventService.getEvents(this.authService.uid).subscribe(data => {
      this.eventos = data.map(e => ({
        title: e.title,
        start: e.date
      }));
      this.actualizarEventos();
    });
  }

  addEvento() {
    if (this.nuevoTitulo.trim() && this.nuevaFecha) {
      this.eventos.push({ title: this.nuevoTitulo.trim(), start: this.nuevaFecha });
      this.actualizarEventos();
      this.nuevoTitulo = '';
      this.nuevaFecha = '';
    }
  }

  actualizarEventos() {
    this.calendarOptions = {
      ...this.calendarOptions,
      events: [...this.eventos]
    };
  }
}
