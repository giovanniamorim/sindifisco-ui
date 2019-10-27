import { ModoPagamento } from './../../modo-pagamento/modo-pagamento.model';
import { PlanoConta, TipoLancamento, SupCaixa } from './../../plano-conta/plano-conta.model';
import { TipoDocumento } from '../../tipo-documento/tipo-documento.model';


export class Despesa
{
    id: string;
    data: string;
    planoConta: PlanoConta [];
    modosPagamentos: ModoPagamento [];
    tipoLancamento: TipoLancamento [];
    numCheque: string;
    tiposDocumentos: TipoDocumento [];
    numDocumento: string;
    supCaixa: SupCaixa [];
    observacao: string;
    imagemDocumento: string;
    ano: string;
    valor: string;



    /**
     * Constructor
     *
     * @param despesa
     */
    constructor(despesa?)
    {
        despesa = despesa || {};
        this.id = despesa.id || '';
        this.data = despesa.data || '';
        this.planoConta = despesa.planoConta || '';
        this.modosPagamentos = despesa.modosPagamentos || '';
        this.tipoLancamento = despesa.tipoLancamento || '';
        this.numCheque = despesa.numCheque || '';
        this.tiposDocumentos = despesa.tiposDocumentos || '';
        this.numDocumento = despesa.numDocumento || '';
        this.supCaixa = despesa.supCaixa || '';
        this.observacao = despesa.observacao || '';
        this.imagemDocumento = despesa.imagemDocumento || '';
        this.ano = despesa.ano || '';

    }

 
}
