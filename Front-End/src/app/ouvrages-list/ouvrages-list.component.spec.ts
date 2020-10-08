import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuvragesListComponent } from './ouvrages-list.component';

describe('OuvragesComponent', () => {
  let component: OuvragesListComponent;
  let fixture: ComponentFixture<OuvragesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OuvragesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OuvragesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
