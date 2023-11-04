import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeTranferAnotherOsdeComponent } from './unsubscribe-tranfer-another-osde.component';

describe('InvEqComponent', () => {
  let component: UnsubscribeTranferAnotherOsdeComponent;
  let fixture: ComponentFixture<UnsubscribeTranferAnotherOsdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnsubscribeTranferAnotherOsdeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnsubscribeTranferAnotherOsdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
