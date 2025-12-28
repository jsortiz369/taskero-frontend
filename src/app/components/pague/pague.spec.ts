import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pague } from './pague';

describe('Pague', () => {
  let component: Pague;
  let fixture: ComponentFixture<Pague>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pague]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pague);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
