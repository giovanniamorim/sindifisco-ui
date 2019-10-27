import { AuthService } from './../../seguranca/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { ErrorObservable} from 'rxjs/observable/ErrorObservable';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import { SindiHttp } from '../../seguranca/sindi-http';
import { environment } from 'environments/environment';

@Injectable()
export class TiposDocumentosService implements Resolve<any>
{
    tiposDocumentosUrl: string;
    tiposDocumentos: any[];
    onTiposDocumentosChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {SindiHttp} _http
     * @param {Router} _router
     */
    constructor(
        private _http: SindiHttp,
        private _router: Router,
        private _auth: AuthService
    )
    {
        // Set the defaults
        this.onTiposDocumentosChanged = new BehaviorSubject({});
        this.tiposDocumentosUrl = `${environment.apiUrl}/tiposdocumentos`;
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getTiposDocumentos()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get tiposDocumentos
     *
     * @returns {Promise<any>}
     */
    getTiposDocumentos(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.get(`${this.tiposDocumentosUrl}`)
                .subscribe((response: any) => {
                    this.tiposDocumentos = response;
                    this.onTiposDocumentosChanged.next(this.tiposDocumentos);
                    resolve(response);
                }, reject);
        });
    }


    deleteTipoDocumento(id: number): any {
        return this._http.delete(`${this.tiposDocumentos}/${id}`)
            .pipe(catchError(this.handleError));
    }

    private handleError(errorReponse: HttpErrorResponse): any {
        if (errorReponse.error instanceof ErrorEvent && errorReponse.status === 404) {
            this._router.navigateByUrl('/', {replaceUrl: true});
        } else {
            this._router.navigateByUrl('/', {replaceUrl: true});
        }

        return new ErrorObservable();
    }
}
