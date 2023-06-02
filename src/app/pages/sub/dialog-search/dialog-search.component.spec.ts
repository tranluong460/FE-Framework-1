import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchComponent } from './dialog-search.component';

describe('DialogSearchComponent', () => {
  let component: DialogSearchComponent;
  let fixture: ComponentFixture<DialogSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogSearchComponent]
    });
    fixture = TestBed.createComponent(DialogSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
