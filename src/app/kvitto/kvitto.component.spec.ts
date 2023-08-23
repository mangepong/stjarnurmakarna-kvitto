import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvittoComponent } from './kvitto.component';

describe('KvittoComponent', () => {
  let component: KvittoComponent;
  let fixture: ComponentFixture<KvittoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KvittoComponent]
    });
    fixture = TestBed.createComponent(KvittoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
