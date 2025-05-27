// src/app/map.component.ts
declare const google: any;

import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService, Event } from './services/event.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #mapContainer 
         class="w-100 shadow rounded border" 
         style="height:80vh; margin: 1rem auto; max-width: 95vw;">
    </div>
  `
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapEl!: ElementRef<HTMLDivElement>;

  constructor(
    private svc: EventService,
    private auth: AuthService
  ) {}

  ngAfterViewInit() {
    const map = new google.maps.Map(this.mapEl.nativeElement, {
      center: { lat: 0, lng: 0 },
      zoom: 2
    });

    const geocoder = new google.maps.Geocoder();

    this.svc.getEvents(this.auth.uid).subscribe(events => {
      if (!events.length) return;

      events.forEach((event, index) => {
        geocoder.geocode({ address: event.location }, (results: any, status: any) => {
          if (status === 'OK' && results[0]) {
            const position = results[0].geometry.location;

            if (index === 0) {
              map.setCenter(position);
              map.setZoom(10);
            }

            const marker = new google.maps.Marker({
              position,
              map,
              title: event.title
            });

            const info = new google.maps.InfoWindow({
              content: `
                <div style="
                  max-width:220px;
                  font-family: Arial, sans-serif;
                  font-size: 13px;
                  line-height: 1.4;
                  padding: 8px;
                ">
                  <h6 style="
                    margin: 0 0 5px 0;
                    font-size: 15px;
                    color: #2c3e50;
                  ">${event.title}</h6>
                  <p style="margin: 0 0 4px 0; color: #555;">
                    <strong>Descripción:</strong> ${event.description || 'No disponible'}
                  </p>
                  <p style="margin: 0 0 4px 0;">
                    <strong>Fecha:</strong> ${new Date(event.date).toLocaleDateString()}
                  </p>
                  <p style="margin: 0 0 4px 0;">
                    <strong>Ubicación:</strong> ${event.location}
                  </p>
                  <p style="margin: 0;">
                    <strong>Capacidad:</strong> ${event.capacity}
                  </p>
                </div>`
            });

            marker.addListener('click', () => {
              info.open(map, marker);
            });
          } else {
            console.warn(`No se pudo geolocalizar: ${event.location}`, status);
          }
        });
      });
    });
  }
}
