import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalErrorHandler } from './global-error-handler.service';
import { UploadFileService } from './main/apps/upload/upload-file.service';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpModule } from '@angular/http';
import { AuthService } from './main/apps/seguranca/auth.service';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; 
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';


import { registerLocaleData, CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);



import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { FakeDbService } from 'app/fake-db/fake-db.service';
import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';
import { SegurancaModule, tokenGetter } from './main/apps/seguranca/seguranca.module';
import { ToastyModule } from 'ng2-toasty';
import { environment } from 'environments/environment';
import { SindiHttp } from './main/apps/seguranca/sindi-http';
import { Error404Component } from './main/pages/errors/404/error-404.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CurrencyMaskModule } from 'ngx-currency-mask';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ngx-currency-mask/src/currency-mask.config';




const appRoutes: Routes = [
    {
        path        : '',
        loadChildren: './main/apps/seguranca/seguranca.module#SegurancaModule'
    },
    {
        path        : 'apps',
        loadChildren: './main/apps/apps.module#AppsModule'
    },
    {
        path        : 'pages',
        loadChildren: './main/pages/pages.module#PagesModule'
    },
    {
        path        : 'ui',
        loadChildren: './main/ui/ui.module#UIModule'
    },
    {
        path        : 'documentation',
        loadChildren: './main/documentation/documentation.module#DocumentationModule'
    },
    {
        path        : 'angular-material-elements',
        loadChildren: './main/angular-material-elements/angular-material-elements.module#AngularMaterialElementsModule'
    }
];

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'right',
    allowNegative: true,
    allowZero: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.'
};


@NgModule({
    declarations: [
        AppComponent,
        Error404Component,
    ],
    imports     : [
        CommonModule,
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot(appRoutes),
        MatInputModule,
        HttpClientModule,
        MatSlideToggleModule,

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),
        
        // Jwt
        JwtModule.forRoot({
            config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: environment.tokenWhitelistedDomains,
              blacklistedRoutes: environment.tokenBlacklistedRoutes
            }
          }),

        SweetAlert2Module.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSelectModule,
        MatRadioModule,
        MatFormFieldModule,
        CurrencyMaskModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppStoreModule,
        SegurancaModule
        

        // Módulos do sistema
        
    ],
    bootstrap   : [
        AppComponent
    ],
    providers   : [
        AuthService,
        UploadFileService,
        SindiHttp,
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
        // { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
    ]
})
export class AppModule
{
}
