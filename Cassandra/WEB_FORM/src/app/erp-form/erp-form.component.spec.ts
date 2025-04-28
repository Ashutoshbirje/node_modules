import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpFormComponent } from './erp-form.component';

describe('ErpFormComponent', () => {
  let component: ErpFormComponent;
  let fixture: ComponentFixture<ErpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErpFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
