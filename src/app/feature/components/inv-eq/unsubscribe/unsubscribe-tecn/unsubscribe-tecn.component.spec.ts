import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeTecnComponent } from './unsubscribe-tecn.component';

describe('InvEqComponent', () => {
  let component: UnsubscribeTecnComponent;
  let fixture: ComponentFixture<UnsubscribeTecnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnsubscribeTecnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnsubscribeTecnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
