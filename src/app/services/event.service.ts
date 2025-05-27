import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Event {
  id?: number;
  user_uid: string;
  title: string;
  description?: string;
  date: string;         // Formato: 'YYYY-MM-DD'
  location: string;
  capacity: number;
}

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiUrl = 'http://localhost/api-gestion-eventos';

  constructor(private http: HttpClient) {}
  

  /** GET all events for a user */
  getEvents(uid: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/get_events.php?uid=${uid}`);
  }


  getEvent(uid: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/get_event.php?uid=${uid}`);
  }


  /** POST add new event */
  addEvent(event: Event): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/add_event.php`,
      event,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  /** PUT update existing event */
  updateEvent(event: Event): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/update_event.php`,
      event,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  /** DELETE an event */
  deleteEvent(id: number, uid: string): Observable<any> {
    return this.http.request<any>(
      'DELETE',
      `${this.apiUrl}/delete_event.php`,
      {
        body: { id, user_uid: uid },
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
