import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvEqComponent } from './inv-eq.component';

describe('InvEqComponent', () => {
  let component: InvEqComponent;
  let fixture: ComponentFixture<InvEqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvEqComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvEqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
