import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeUebComponent } from './unsubscribe-tranfer-ueb.component';

describe('InvEqComponent', () => {
  let component: UnsubscribeUebComponent;
  let fixture: ComponentFixture<UnsubscribeUebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnsubscribeUebComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnsubscribeUebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
