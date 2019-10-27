export class ModoPagamento
{
    id: number;
    descricao: string;

    /**
     * Constructor
     *
     * @param modoPagamento
     */
    constructor(modoPagamento?)
    {
        modoPagamento = modoPagamento || {};
        this.id = modoPagamento.id ;
        this.descricao = modoPagamento.descricao || '';
    }
 
}
