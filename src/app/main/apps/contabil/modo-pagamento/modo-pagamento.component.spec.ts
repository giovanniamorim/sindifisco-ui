import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModoPagamentoComponent } from './modo-pagamento.component';

describe('ModoPagamentoComponent', () => {
  let component: ModoPagamentoComponent;
  let fixture: ComponentFixture<ModoPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModoPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModoPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
