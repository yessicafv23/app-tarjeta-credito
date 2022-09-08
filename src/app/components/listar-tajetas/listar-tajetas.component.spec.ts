import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTajetasComponent } from './listar-tajetas.component';

describe('ListarTajetasComponent', () => {
  let component: ListarTajetasComponent;
  let fixture: ComponentFixture<ListarTajetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTajetasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTajetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
