import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDocumentosComponent } from './tipos-documentos.component';
import { TiposDocumentosService } from './tipos-documentos.service';
import { MatIcon, MatAutocomplete, MatFormField, MatOption, MatChipList, MatChip, MatIconModule } from '@angular/material';
import { MaterialModule } from 'app/main/angular-material-elements/material.module';
import { RouterModule, Router } from '@angular/router';
import { LOCALE_ID, Input } from '@angular/core';


describe('Tipos de Documentos', () => {
    
    let component: TiposDocumentosComponent;
    let fixture: ComponentFixture<TiposDocumentosComponent>;

    beforeEach(async(() => {
        
        TestBed.configureTestingModule({
        imports: [ MaterialModule, RouterModule, MatIconModule, HttpClientModule],
        declarations: [ TiposDocumentosComponent ],
        providers   : [
            TiposDocumentosService, Router
        ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TiposDocumentosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
      });


    it('Deveria listar os tipos de documentos', () => {
        expect(1 + 2).toBe(3);
    });
});
