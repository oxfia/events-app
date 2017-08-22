import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRsvpsComponent } from './my-rsvps.component';

describe('MyRsvpsComponent', () => {
  let component: MyRsvpsComponent;
  let fixture: ComponentFixture<MyRsvpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRsvpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRsvpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
