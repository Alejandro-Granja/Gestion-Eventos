// src/app/stats.component.ts

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService, Event } from './services/event.service';
import { AuthService } from './services/auth.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2 class="mb-4">Estadísticas de Eventos</h2>
      <div class="row">
        <div class="col-md-12">
          <h5>Número de eventos por mes</h5>
          <canvas #eventsPerMonthCanvas></canvas>
        </div>
      </div>
    </div>
  `
})
export class StatsComponent implements OnInit {
  @ViewChild('eventsPerMonthCanvas', { static: true })
  eventsPerMonthCanvas!: ElementRef<HTMLCanvasElement>;

  private eventsChart!: Chart;

  constructor(
    private svc: EventService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.svc.getEvents(this.auth.uid).subscribe((events: Event[]) => {
      // Mapear eventos y extraer mes y año de la fecha
      // asumiendo que event.date está en formato 'YYYY-MM-DD'
      const countsByMonth: { [key: string]: number } = {};

      events.forEach(ev => {
        if (!ev.date) return;

        // Extraer año y mes (ej: "2025-05")
        const monthKey = ev.date.substring(0, 7);

        countsByMonth[monthKey] = (countsByMonth[monthKey] || 0) + 1;
      });

      // Ordenar las claves (meses)
      const sortedMonths = Object.keys(countsByMonth).sort();

      // Datos para gráfico
      const dataCounts = sortedMonths.map(m => countsByMonth[m]);

      // Etiquetas en formato más amigable, ej: "May 2025"
      const labels = sortedMonths.map(m => {
        const [year, month] = m.split('-');
        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
      });

      // Crear gráfico de barras
      this.eventsChart = new Chart(this.eventsPerMonthCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Eventos',
            data: dataCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              }
            }
          },
          plugins: {
            legend: {
              display: true
            }
          }
        }
      });
    });
  }
}
