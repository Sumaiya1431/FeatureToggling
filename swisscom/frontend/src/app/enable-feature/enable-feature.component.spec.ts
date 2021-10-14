import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableFeatureComponent } from './enable-feature.component';

describe('EnableFeatureComponent', () => {
  let component: EnableFeatureComponent;
  let fixture: ComponentFixture<EnableFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnableFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
