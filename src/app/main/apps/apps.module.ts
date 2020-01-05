import { CommonModule } from '@angular/common';
import { AuthService } from './seguranca/auth.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule, MatDatepicker, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatRippleModule, MatIconModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';


const routes = [
    {
        path        : 'dashboards/analytics',
        loadChildren: './dashboards/analytics/analytics.module#AnalyticsDashboardModule'
    },
    {
        path        : 'dashboards/project',
        loadChildren: './dashboards/project/project.module#ProjectDashboardModule'
    },
    {
        path        : 'mail',
        loadChildren: './mail/mail.module#MailModule'
    },
    {
        path        : 'mail-ngrx',
        loadChildren: './mail-ngrx/mail.module#MailNgrxModule'
    },
    {
        path        : 'chat',
        loadChildren: './chat/chat.module#ChatModule'
    },
    {
        path        : 'calendar',
        loadChildren: './calendar/calendar.module#CalendarModule'
    },
    {
        path        : 'e-commerce',
        loadChildren: './e-commerce/e-commerce.module#EcommerceModule'
    },
    {
        path        : 'academy',
        loadChildren: './academy/academy.module#AcademyModule'
    },
    {
        path        : 'todo',
        loadChildren: './todo/todo.module#TodoModule'
    },
    {
        path        : 'file-manager',
        loadChildren: './file-manager/file-manager.module#FileManagerModule'
    },
    {
        path        : 'upload',
        loadChildren: './upload/upload.module#UploadModule'
    },
    {
        path        : 'contacts',
        loadChildren: './contacts/contacts.module#ContactsModule'
    },
    {
        path        : 'scrumboard',
        loadChildren: './scrumboard/scrumboard.module#ScrumboardModule'
    },
    {
        path        : 'contabil',
        loadChildren: './contabil/contabil.module#ContabilModule'
    }
    
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatDatepickerModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        CommonModule,
        RouterModule,

        MatIconModule,
        MatInputModule,
        MatFormFieldModule
    ],
    declarations: [
        ConfirmationDialogComponent, 
        ],
    entryComponents: [
        ConfirmationDialogComponent,
        
      ],
})
export class AppsModule
{
}
