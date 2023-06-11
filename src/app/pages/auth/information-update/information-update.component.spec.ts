import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationUpdateComponent } from './information-update.component';

describe('InformationUpdateComponent', () => {
  let component: InformationUpdateComponent;
  let fixture: ComponentFixture<InformationUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationUpdateComponent]
    });
    fixture = TestBed.createComponent(InformationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
