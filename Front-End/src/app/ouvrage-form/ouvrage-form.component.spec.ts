import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuvrageFormComponent } from './ouvrage-form.component';

describe('OuvrageFormComponent', () => {
  let component: OuvrageFormComponent;
  let fixture: ComponentFixture<OuvrageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OuvrageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OuvrageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
