import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoCompleteComponent } from './auto-complete.component';

describe('AutoCompleteComponent', () => {
  let component: AutoCompleteComponent<any>;
  let fixture: ComponentFixture<AutoCompleteComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoCompleteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
