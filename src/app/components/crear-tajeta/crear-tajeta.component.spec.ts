import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTajetaComponent } from './crear-tajeta.component';

describe('CrearTajetaComponent', () => {
  let component: CrearTajetaComponent;
  let fixture: ComponentFixture<CrearTajetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTajetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTajetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
