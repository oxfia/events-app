import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ENV } from './env.config';
import { EventModel } from './models/event.model';
import { RsvpModel } from './models/rsvp.model';

@Injectable()
export class ApiService {

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private auth: AuthService
  ) { }

// GET list of public, future events
 getEvents$(): Observable<EventModel[]> {
    return this.http
      .get(`${ENV.BASE_API}events`)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  // GET all events - private and public (admin only)
  getAdminEvents$(): Observable<EventModel[]> {
     return this.authHttp
     .get(`${ENV.BASE_API}events/admin`)
     .map(this._handleSuccess)
     .catch(this._handleError);
  }

  // GET an event by ID (login required)
  getEventById$(id: string): Observable<EventModel> {
    return this.authHttp
    .get(`${ENV.BASE_API}event/${id}`)
    .map(this._handleSuccess)
    .catch(this._handleError);
  }

  // GET RSVPS by event ID (login required)
  getRsvpsByEventId$(eventId: string): Observable<RsvpModel[]> {
    return this.authHttp
    .get(`${ENV.BASE_API}event/${eventId}/rsvps`)
    .map(this._handleSuccess)
    .catch(this._handleError);
  }

  private _handleSuccess(res: Response) {
    return res.json();
  }

  private _handleError(err: Response | any) {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT presesnt') > -1) {
       this.auth.login();
    }
      return Observable.throw(errorMsg);
  }

}
