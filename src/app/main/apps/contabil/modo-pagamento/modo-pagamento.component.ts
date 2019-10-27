import { ModoPagamento } from './modo-pagamento.model';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { ModoPagamentoService } from './modo-pagamento.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'modo-pagamento',
  templateUrl: './modo-pagamento.component.html',
  styleUrls: ['./modo-pagamento.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class ModoPagamentoComponent implements OnInit, OnDestroy
{
    modoPagamento: ModoPagamento;
    pageType: string;
    modoPagamentoForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ModoPagamento} _modoPagamentoService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _modoPagamentoService: ModoPagamentoService,
        private _formBuilder: FormBuilder,
        private _router: Router
    )
    {
        // Set the default
        this.modoPagamento = new ModoPagamento();

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
        // Subscribe to update modoPagamento on changes
        this._modoPagamentoService.onModoPagamentoChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(modoPagamento => {
                if ( modoPagamento ){
                    this.modoPagamento = new ModoPagamento(modoPagamento);
                    this.pageType = 'editar';
                } else {
                    this.pageType = 'novo';
                    this.modoPagamento = new ModoPagamento();
                }
                this.modoPagamentoForm = this.createModoPagamentoForm();
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
     * Create modoPagamento form
     *
     * @returns {FormGroup}
     */
    createModoPagamentoForm(): FormGroup
    {
        return this._formBuilder.group({
            id              : [this.modoPagamento.id],
            descricao       : [this.modoPagamento.descricao],
        });
    }
    

    /**
     * Salvar modoPagamento
     */
    salvarModoPagamento(): void {
        const data = this.modoPagamentoForm.getRawValue();
        this._modoPagamentoService.postModoPagamento(data)
            .then(() => {
                this._modoPagamentoService.onModoPagamentoChanged.next(data);
                Swal.fire({
                    position: 'top-end',
                    type: 'success',
                    title: 'Modo de pagamento salvo com sucesso!',
                    showConfirmButton: false,
                    timer: 3000
                  });
            });
    }
    

    /**
     * Novo modoPagamento
     */
    novoModoPagamento(): void
    {
        const data = this.modoPagamentoForm.getRawValue();
        this._modoPagamentoService.postModoPagamento(data)
            .then(() => {
                this._modoPagamentoService.onModoPagamentoChanged.next(data);
                // Mostra mensagem de sucesso
                Swal.fire({
                    position: 'top-end',
                    type: 'success',
                    title: 'Modo de pagamento adicionado com sucesso!',
                    showConfirmButton: false,
                    timer: 3000
                  });
                this._router.navigate(['/apps/contabil/modos-pagamentos']);
            });
    }
    
}
