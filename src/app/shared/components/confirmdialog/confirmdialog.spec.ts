import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Confirmdialog } from './confirmdialog';

describe('Confirmdialog', () => {
  let component: Confirmdialog;
  let fixture: ComponentFixture<Confirmdialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Confirmdialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Confirmdialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
