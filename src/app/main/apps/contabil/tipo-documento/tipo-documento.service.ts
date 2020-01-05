import { tap, catchError } from 'rxjs/operators';
import { TipoDocumento } from './tipo-documento.model';
import { AuthService } from './../../seguranca/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { SindiHttp } from '../../seguranca/sindi-http';
import { environment } from 'environments/environment';

import 'rxjs/add/operator/catch';

@Injectable()
export class TipoDocumentoService implements Resolve<any> {
    
    tipoDocumentoUrl: string;
    routeParams: any;
    tipoDocumento: any;
    onTipoDocumentoChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param { SindiHttp } _http
     */
    constructor(
        private _http: SindiHttp,
        private _auth: AuthService
    )
    {
        // Set the defaults
        this.onTipoDocumentoChanged = new BehaviorSubject({});
        this.tipoDocumentoUrl = `${environment.apiUrl}/tiposdocumentos`;
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
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getTipoDocumento()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get tipodocumento
     *
     * @returns {Promise<any>}
     */
    getTipoDocumento(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'novo' )
            {
                this.onTipoDocumentoChanged.next(false);
                resolve(false);
            }
            else
            {
                this._http.get(`${this.tipoDocumentoUrl}/${this.routeParams.id}`)
                    .subscribe((response: any) => {
                        this.tipoDocumento = response;
                        this.onTipoDocumentoChanged.next(this.tipoDocumento);
                        resolve(response);
                    }, reject);
            }
        });
    }

    

    /**
     * Add tipoDocumento
     *
     * @param tipoDocumento
     * @returns {Promise<any>}
     */
    addTipoDocumento(tipoDocumento): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._http.post(`${this.tipoDocumentoUrl}`, tipoDocumento)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


    /**
     * Save tipoDocumento
     *
     * @param tipoDocumento
     * @returns {Promise<any>}
     */
    saveTipoDocumento(tipoDocumento): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._http.put(`${this.tipoDocumentoUrl}/${tipoDocumento.id}`, tipoDocumento)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getTiposDocumentos(): Observable<TipoDocumento[]> {
        return this._http.get<TipoDocumento[]>(`${this.tipoDocumentoUrl}`)
          .pipe(
            tap(modosPagamentos => console.log('fetched modosPagamentos')),
            catchError(this.handleError('getProducts', []))
          );
      }

      private handleError<T> (operation = 'operation', result?: T): any {
        return (error: any): Observable<T> => {
      
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }

}
