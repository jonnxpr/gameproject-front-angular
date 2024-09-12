import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGamesComponent } from './register-games.component';

describe('RegisterGamesComponent', () => {
  let component: RegisterGamesComponent;
  let fixture: ComponentFixture<RegisterGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
