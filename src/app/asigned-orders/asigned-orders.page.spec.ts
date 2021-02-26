import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsignedOrdersPage } from './asigned-orders.page';

describe('AsignedOrdersPage', () => {
  let component: AsignedOrdersPage;
  let fixture: ComponentFixture<AsignedOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignedOrdersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsignedOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
