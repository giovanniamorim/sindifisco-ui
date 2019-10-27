import { MatDatepicker } from '@angular/material';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {  Despesa } from './despesa.model';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { DespesaService } from './despesa.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UploadFileService } from 'app/main/apps/upload/upload-file.service';
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

    modosPagamentos = [];
    tiposDocumentos = [];

    // Propriedade do upload
    selectedFiles: FileList;
    currentFileUpload: File;
    progress: { percentage: number } = { percentage: 0 };


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DespesaService} _despesaService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param {ModoPagamentoService} __modosPagamentosService
     */
    constructor(
        private _despesaService: DespesaService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _uploadService: UploadFileService,
        private _modosPagamentosService: ModoPagamentoService
        
        )
        {
            // Set the default
            this.despesa = new Despesa();
            
            // Set the private defaults
            this._unsubscribeAll = new Subject();

            this.modosPagamentos = this.getModosPagamentos();
            this.tiposDocumentos = this.getTiposDocumentos();
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
                    this.pageType = 'nova';
                    this.despesa = new Despesa();
                }
                this.despesaForm = this.createDespesaForm();
            });
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
            planoConta      : [this.despesa.planoConta],
            modosPagamentos : [this.despesa.modosPagamentos],
            tipoLancamento  : [this.despesa.tipoLancamento],
            numCheque       : [this.despesa.numCheque],
            tiposDocumentos : [this.despesa.tiposDocumentos],
            numDocumento    : [this.despesa.numDocumento],
            supCaixa        : [this.despesa.supCaixa],
            observacao      : [this.despesa.observacao],
            imagemDocumento : [this.despesa.imagemDocumento],
            ano             : [this.despesa.ano],
            valor           : [this.despesa.valor]
        });
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

    getModosPagamentos(): any{
        return [
            { id: '5', descricao: 'Dinheiro' },
            { id: '6', descricao: 'Cheque' },
            { id: '7', descricao: 'Transação Bancária' },
            { id: '11', descricao: 'Cartão de Crédito' }
          ];
    }

    getTiposDocumentos(): any{
        return [
            { id: '2',  descricao: 'Boleto' },
            { id: '3',  descricao: 'Recibo' },
            { id: '4',  descricao: 'Cupom Fiscal' },
            { id: '7',  descricao: 'Nota Fiscal' },
            { id: '9',  descricao: 'Transferência Bancária' },
            { id: '10', descricao: 'Cópia de Cheque' },
            { id: '11', descricao: 'TED' },
            { id: '12', descricao: 'DOC' }
          ];
    }

    // Upload de Arquivos
    selectFile(event): any {
        this.selectedFiles = event.target.files;
    }
    
    upload(): any {
        this.progress.percentage = 0;
        this.currentFileUpload = this.selectedFiles.item(0);
        this._uploadService.pushFileToStorage(this.currentFileUpload)
            .subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.progress.percentage = Math.round(100 * event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                    console.log('Arquivo enviado com sucesso!');
                }
            });
            this.selectedFiles = undefined;
    }
    
}

