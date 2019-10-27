import { UploadFileService } from './../upload-file.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.scss']
})
export class ListUploadComponent implements OnInit {

showFile = false;
fileUploads: Observable<string[]>;

constructor(
    private uploadService: UploadFileService
) { }

    ngOnInit(): any {
    }

    showFiles(enable: boolean): any {
        this.showFile = enable;

        if (enable) {
            this.fileUploads = this.uploadService.getFiles();
        }
    }

}
