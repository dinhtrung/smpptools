import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmppPresetsComponent } from './smpp-presets.component';

describe('SmppPresetsComponent', () => {
  let component: SmppPresetsComponent;
  let fixture: ComponentFixture<SmppPresetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmppPresetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmppPresetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
