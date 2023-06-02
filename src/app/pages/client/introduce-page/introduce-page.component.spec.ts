import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroducePageComponent } from './introduce-page.component';

describe('IntroducePageComponent', () => {
  let component: IntroducePageComponent;
  let fixture: ComponentFixture<IntroducePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntroducePageComponent],
    });
    fixture = TestBed.createComponent(IntroducePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
