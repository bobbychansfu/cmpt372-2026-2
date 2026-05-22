import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEditFormComponent } from './person-edit-form.component';

describe('PersonEditFormComponent', () => {
  let component: PersonEditFormComponent;
  let fixture: ComponentFixture<PersonEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
