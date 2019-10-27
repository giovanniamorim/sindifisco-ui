import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Route } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { SindiHttp } from '../../seguranca/sindi-http';
import { environment } from 'environments/environment';

import 'rxjs/add/operator/catch';

@Injectable()
export class ModoPagamentoService implements Resolve<any>
{
    modoPagamentoUrl: string;
    routeParams: any;
    modoPagamento: any;
    onModoPagamentoChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {SindiHttp} _http
     */
    constructor(
        private _http: SindiHttp,
    )
    {
        // Set the defaults
        this.onModoPagamentoChanged = new BehaviorSubject({});
        this.modoPagamentoUrl = `${environment.apiUrl}/modospagamentos`;
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
                this.getModoPagamento()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get modoPagamento
     *
     * @returns {Promise<any>}
     */
    getModoPagamento(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'novo' )
            {
                this.onModoPagamentoChanged.next(false);
                resolve(false);
            }
            else
            {
                this._http.get(`${this.modoPagamentoUrl}/${this.routeParams.id}`)
                    .subscribe((response: any) => {
                        this.modoPagamento = response;
                        this.onModoPagamentoChanged.next(this.modoPagamento);
                        resolve(response);
                    }, reject);
            }
        });
    }

        /**
     * Get modoPagamento
     *
     * @returns {Promise<any>}
     */
    getModosPagamentos(): Promise<any> {
        return new Promise((resolve, reject) => {
                this._http.get(`${this.modoPagamentoUrl}`)
                    .subscribe((response: any) => {
                        this.modoPagamento = response;
                        this.onModoPagamentoChanged.next(this.modoPagamento);
                        resolve(response);
                    }, reject);
            
        });
    }

    

    /**
     * Add modoPagamento
     *
     * @param modoPagamento
     * @returns {Promise<any>}
     */
    postModoPagamento(modoPagamento): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.post(`${this.modoPagamentoUrl}`, modoPagamento)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


    /**
     * Save modoPagamento
     *
     * @param modoPagamento
     * @returns {Promise<any>}
     */
    updateModoPagamento(modoPagamento): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.put(`${this.modoPagamentoUrl}/${modoPagamento.id}`, modoPagamento)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

}
