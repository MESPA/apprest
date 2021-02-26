import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderfollowPage } from './orderfollow.page';

describe('OrderfollowPage', () => {
  let component: OrderfollowPage;
  let fixture: ComponentFixture<OrderfollowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderfollowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderfollowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
