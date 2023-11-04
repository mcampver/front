import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvEditComponent } from './inv-edit.component';

describe('InvEqComponent', () => {
  let component: InvEditComponent;
  let fixture: ComponentFixture<InvEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
