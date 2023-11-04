import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeSameOsdeComponent } from './unsubscribe-tranfer-same-osde.component';

describe('InvEqComponent', () => {
  let component: UnsubscribeSameOsdeComponent;
  let fixture: ComponentFixture<UnsubscribeSameOsdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnsubscribeSameOsdeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnsubscribeSameOsdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
