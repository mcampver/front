import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeTranferExternalCompanyComponent } from './unsubscribe-tranfer-external-company.component';

describe('InvEqComponent', () => {
  let component: UnsubscribeTranferExternalCompanyComponent;
  let fixture: ComponentFixture<UnsubscribeTranferExternalCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnsubscribeTranferExternalCompanyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      UnsubscribeTranferExternalCompanyComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
