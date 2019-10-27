import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { SindiHttp } from './sindi-http';

@Injectable()
export class LogoutService {

tokensRenokeUrl: string;

constructor(
  private _http: SindiHttp,
  private _auth: AuthService
) {
  this.tokensRenokeUrl = `${environment.apiUrl}/tokens/revoke`;
}

    logout(): any {
    return this._http.delete(this.tokensRenokeUrl, { withCredentials: true })
        .toPromise()
        .then(() => {
        this._auth.limparAccessToken();
        });
    }
}
