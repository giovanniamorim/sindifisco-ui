import { baseURL } from 'app/app.api';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseType } from '@angular/http';



@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
      private _httpCliente: HttpClient
  ) { }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>>{
      const formData: FormData = new FormData();
      formData.append('file', file);

      const req = new HttpRequest('POST', `${baseURL}/arquivos/novo`, formData, {
          reportProgress: true,
          responseType: 'text',
      }); 

      return this._httpCliente.request(req);
  }

  getFiles(): Observable<any> {
    return this._httpCliente.get(`${baseURL}/arquivos/todos`);
  }
}
