import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';


export function authHttpFactory (http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
       tokenName: 'token',
       tokenGetter: (() => localStorage.getItem('acces_token'))
  }), http, options);
}

