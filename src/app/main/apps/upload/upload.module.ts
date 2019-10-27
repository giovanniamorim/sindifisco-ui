import { DetailsUploadComponent } from './details-upload/details-upload.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUploadComponent } from './list-upload/list-upload.component';
import { UploadFileService } from './upload-file.service';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, 
         MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, 
         MatSortModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatDatepickerModule, 
         MatSlideToggleModule, MatRadioModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
    {
        path     : 'arquivos',
        component: ListUploadComponent,
        // resolve  : {
        //     data: UploadFileService
        // }
        
    },
    {
        path     : 'arquivo/novo',
        component: FormUploadComponent,
        // resolve  : {
        //     data: UploadFileService
        // }
    },
    {
        path     : 'arquivo/:filename',
        component: DetailsUploadComponent,
        // resolve  : {
        //     data: UploadFileService
        // }
    },
    
];

@NgModule({
    declarations: [
        DetailsUploadComponent,
        FormUploadComponent,
        ListUploadComponent,
        
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatRadioModule,
            


        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        
    ],
    providers   : [
        UploadFileService
    ]
})
export class UploadModule { }

