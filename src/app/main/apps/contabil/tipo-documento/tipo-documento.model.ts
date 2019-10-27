import { FuseUtils } from './../../../../../@fuse/utils/index';
import { MatChipInputEvent } from '@angular/material';


export class TipoDocumento
{
    id: number;
    descricao: string;
    // handle?: string;

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
        // this.handle = tipoDocumento.handle || FuseUtils.handleize(this.descricao);
    }

 
}
