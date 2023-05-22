import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseClientComponent } from './base-client.component';

describe('BaseClientComponent', () => {
  let component: BaseClientComponent;
  let fixture: ComponentFixture<BaseClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseClientComponent]
    });
    fixture = TestBed.createComponent(BaseClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
