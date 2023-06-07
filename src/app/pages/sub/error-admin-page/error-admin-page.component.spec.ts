import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorAdminPageComponent } from './error-admin-page.component';

describe('ErrorAdminPageComponent', () => {
  let component: ErrorAdminPageComponent;
  let fixture: ComponentFixture<ErrorAdminPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorAdminPageComponent]
    });
    fixture = TestBed.createComponent(ErrorAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
