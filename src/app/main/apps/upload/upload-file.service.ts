import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.hmr';
import { SindiHttp } from '../seguranca/sindi-http';



@Injectable()
export class UploadFileService {

  uploadArquivoUrl: string;  

  constructor(
      private _http: SindiHttp
  ) 
  { 
    this.uploadArquivoUrl = `${environment}/arquivos`;
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>>{
      const formData: FormData = new FormData();
      formData.append('file', file);

      const req = new HttpRequest('POST', `${this.uploadArquivoUrl}/novo`, formData, {
          reportProgress: true,
          responseType: 'text',
      }); 

      return this._http.request(req);
  }

  getFiles(): Observable<any> {
    return this._http.get(`${this.uploadArquivoUrl}/todos`);
  }
}
