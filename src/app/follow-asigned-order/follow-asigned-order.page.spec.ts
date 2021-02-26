import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FollowAsignedOrderPage } from './follow-asigned-order.page';

describe('FollowAsignedOrderPage', () => {
  let component: FollowAsignedOrderPage;
  let fixture: ComponentFixture<FollowAsignedOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowAsignedOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FollowAsignedOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
