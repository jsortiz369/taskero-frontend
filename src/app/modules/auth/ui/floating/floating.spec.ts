import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Floating } from './floating';

describe('Floating', () => {
  let component: Floating;
  let fixture: ComponentFixture<Floating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Floating]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Floating);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
