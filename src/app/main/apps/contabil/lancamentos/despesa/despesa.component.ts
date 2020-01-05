import { PlanoContaService } from './../../plano-conta/plano-conta.service';
import { PlanoConta, SupCaixa, SupCaixaEnum } from './../../plano-conta/plano-conta.model';
import { TiposDocumentosService } from './../../tipos-documentos/tipos-documentos.service';
import { TipoDocumentoService } from './../../tipo-documento/tipo-documento.service';
import { TipoDocumento } from './../../tipo-documento/tipo-documento.model';
import { MatDatepicker } from '@angular/material';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {  Despesa } from './despesa.model';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { DespesaService } from './despesa.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { ModoPagamento } from '../../modo-pagamento/modo-pagamento.model';
import { ModoPagamentoService } from '../../modo-pagamento/modo-pagamento.service';
 


@Component({
  selector: 'despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class DespesaComponent implements OnInit, OnDestroy
{
    despesa: Despesa;
    pageType: string;
    despesaForm: FormGroup;

    modosPagamentos: ModoPagamento[] = [];
    tiposDocumentos: TipoDocumento[] = [];
    planosContas: PlanoConta[] = [];

    supCaixaEnum = SupCaixaEnum;
    keys = [];

    // Private
    private _unsubscribeAll: Subject<any>;
    
    /**
     * Constructor
     *
     * @param {DespesaService} _despesaService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {ModoPagamentoService} __modoPagamentoService
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _despesaService: DespesaService,
        private _modoPagamentoService: ModoPagamentoService,
        private _tipoDocumentoService: TipoDocumentoService,
        private _planoContaService: PlanoContaService
        
        ) {
            // Set the default
            this.despesa = new Despesa();
            // Set the private defaults
            this._unsubscribeAll = new Subject();
        }
        
        // -----------------------------------------------------------------------------------------------------
        // @ Lifecycle hooks
        // -----------------------------------------------------------------------------------------------------
        
        /**
         * On init
         */
        ngOnInit(): void
        {
            // Subscribe to update despesa on changes
            this._despesaService.onDespesaChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(despesa => {
                if ( despesa ){
                    this.despesa = new Despesa(despesa);
                    this.pageType = 'editar';
                } else {
                    this.pageType = 'novo';
                    this.despesa = new Despesa();
                }
                this.despesaForm = this.createDespesaForm();
            });

            // Lista Modos Pagamentos no select
            this._modoPagamentoService.getModosPagamentos2()
                .subscribe(res => {
                    this.modosPagamentos = res;
                    console.log(this.modosPagamentos);
                }, err => {
                console.log(err);
                });

            // Lista Tipos de Documentos no select
            this._tipoDocumentoService.getTiposDocumentos()
                .subscribe(res => {
                    this.tiposDocumentos = res;
                    console.log('Tipos de Documentos: ', this.tiposDocumentos);
                }, err => {
                    console.log(err);
                });

            // Lista os Planos de Contas no Select
            this._planoContaService.getPlanosContas()
                .subscribe(res => {
                    this.planosContas = res;
                    console.log('Planos de Contas:', this.planosContas);
                }, err => {
                    console.log(err);
                });

        this.keys = Object.keys(this.supCaixaEnum);
        

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * Create dsepesa form
     *
     * @returns {FormGroup}
     */
    createDespesaForm(): FormGroup
    {
        return this._formBuilder.group({
            id              : [this.despesa.id],
            data            : [this.despesa.data],
            planosContas    : [this.despesa.planoConta],
            modosPagamentos : [this.despesa.modoPagamento],
            tipoLancamento  : [this.despesa.tipoLancamento],
            numCheque       : [this.despesa.numCheque],
            tiposDocumentos : [this.despesa.tipoDocumento],
            numDocumento    : [this.despesa.numDocumento],
            supCaixas       : [this.despesa.supCaixa],
            observacao      : [this.despesa.observacao],
            imagemDocumento : [this.despesa.imagemDocumento],
            ano             : [this.despesa.ano],
            valor           : [this.despesa.valor]
        });
        
        console.log('Modos Pagamentos Vai: ', this.modosPagamentos);
        console.log('Tipos de Documentos Vai: ', this.tiposDocumentos);
    }
    
    /**
     * Atualizar despesa
     */
    atualizarDespesa(): void {
        const data = this.despesaForm.getRawValue();
        this._despesaService.putDespesa(data)
            .then(() => {
                this._despesaService.onDespesaChanged.next(data);
                Swal.fire({
                    position: 'top-end',
                    type: 'success',
                    title: 'Despesa atualizada com sucesso!',
                    showConfirmButton: false,
                    timer: 3000
                  });
            });
    }


    /**
     * Nova despesa
     */
    novaDespesa(): void {
        const data = this.despesaForm.getRawValue();
        this._despesaService.postDespesa(data)
            .then(() => {
                this._despesaService.onDespesaChanged.next(data);
                // Mostra mensagem de sucesso
                Swal.fire({
                    position: 'top-end',
                    type: 'success',
                    title: 'Despesa adicionada com sucesso!',
                    showConfirmButton: false,
                    timer: 3000
                  });
                // Retorna para a lista de despesas
                this._router.navigate(['/apps/contabil/lancamentos/despesas']);
            });
    }

    compareModPag(mp1: any, mp2: any): any{
        return (mp1.id === mp2.id && mp1.descricao === mp2.descricao);
    }

    compareTipoDoc(td1: any, td2: any): any {
        return (td1.id === td2.id && td1.descricao === td2.descricao);
    }

    compareContas(pc1: any, pc2: any): any {
        return (pc1.id === pc2.id && pc1.descricao === pc2.descricao);
    }

    compareSupCaixas(sc1: any, sc2: any): any {
        return (sc1.descricao === sc2.descricao );
    }

}

