import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningServicesComponent } from './cleaning-services.component';

describe('CleaningServicesComponent', () => {
  let component: CleaningServicesComponent;
  let fixture: ComponentFixture<CleaningServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleaningServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
