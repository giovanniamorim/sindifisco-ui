import { TipoDocumento } from './tipo-documento.model';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { TipoDocumentoService } from './tipo-documento.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class TipoDocumentoComponent implements OnInit, OnDestroy
{
    tipoDocumento: TipoDocumento;
    pageType: string;
    tipoDocumentoForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {TipoDocumentoService} _tipoDocumentoService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _tipoDocumentoService: TipoDocumentoService,
        private _formBuilder: FormBuilder,
        private _router: Router
    )
    {
        // Set the default
        this.tipoDocumento = new TipoDocumento();

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
        // Subscribe to update tipoDocumento on changes
        this._tipoDocumentoService.onTipoDocumentoChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(tipoDocumento => {
                if ( tipoDocumento ){
                    this.tipoDocumento = new TipoDocumento(tipoDocumento);
                    this.pageType = 'editar';
                } else {
                    this.pageType = 'novo';
                    this.tipoDocumento = new TipoDocumento();
                }
                this.tipoDocumentoForm = this.createTipoDocumentoForm();
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
     * Create tipoDocumento form
     *
     * @returns {FormGroup}
     */
    createTipoDocumentoForm(): FormGroup
    {
        return this._formBuilder.group({
            id              : [this.tipoDocumento.id],
            descricao       : [this.tipoDocumento.descricao],
            // handle          : [this.tipoDocumento.handle],
            
        });
    }
    

    /**
     * Save tipoDocumento
     */
    saveTipoDocumento(): void {
        const data = this.tipoDocumentoForm.getRawValue();
        this._tipoDocumentoService.saveTipoDocumento(data)
            .then(() => {
                this._tipoDocumentoService.onTipoDocumentoChanged.next(data);
                Swal.fire({
                    position: 'top-end',
                    type: 'success',
                    title: 'Tipo de Documento salvo com sucesso!',
                    showConfirmButton: false,
                    timer: 3000
                  });
            });
    }


    /**
     * Novo tipoDocumento
     */
    addTipoDocumento(): void {
        const data = this.tipoDocumentoForm.getRawValue();
        this._tipoDocumentoService.addTipoDocumento(data)
            .then(() => {
                this._tipoDocumentoService.onTipoDocumentoChanged.next(data);
                // Mostra mensagem de sucesso
                Swal.fire({
                    position: 'top-end',
                    type: 'success',
                    title: 'Tipo de Documento adicionado com sucesso!',
                    showConfirmButton: false,
                    timer: 3000
                  });
                this._router.navigate(['/apps/contabil/tipos-documentos']);
            });
    }
    
}

