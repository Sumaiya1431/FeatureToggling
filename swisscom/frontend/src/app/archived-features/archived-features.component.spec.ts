import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedFeaturesComponent } from './archived-features.component';

describe('ArchivedFeaturesComponent', () => {
  let component: ArchivedFeaturesComponent;
  let fixture: ComponentFixture<ArchivedFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
