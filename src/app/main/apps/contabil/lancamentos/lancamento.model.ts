import { MatChipInputEvent } from '@angular/material';

import { FuseUtils } from '@fuse/utils';

export class Lancamento
{

    id: string; 
    imagemDocumento: string; 
    data: string; 
    planoConta: string; 
    modoPagamento: string; 
    tipoDocumento: string;
    supCaixa: string;
    valor;


    /**
     * Constructor
     *
     * @param lancamento
     */
    constructor(lancamento?)
    {
        lancamento = lancamento || {};
        this.id = lancamento.id || FuseUtils.generateGUID();

        this.imagemDocumento = lancamento.imagemDocumento;
        this.planoConta = lancamento.planoConta;
        this.data = lancamento.data;
        this.modoPagamento = lancamento.modoPagamento;
        this.tipoDocumento = lancamento.tipoDocumento;
        this.supCaixa = lancamento.supCaixa;
        this.valor = lancamento.valor;
    }

}
