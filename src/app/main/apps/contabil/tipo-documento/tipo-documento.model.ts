export class TipoDocumento
{
    id: number;
    descricao: string;

    /**
     * Constructor
     *
     * @param tipoDocumento
     */
    constructor(tipoDocumento?)
    {
        tipoDocumento = tipoDocumento || {};
        this.id = tipoDocumento.id ;
        this.descricao = tipoDocumento.descricao || '';
    }

 
}
