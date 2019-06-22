import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelistComponent } from './admin-panelist.component';

describe('AdminPanelistComponent', () => {
  let component: AdminPanelistComponent;
  let fixture: ComponentFixture<AdminPanelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
