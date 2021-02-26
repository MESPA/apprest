import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewcarPage } from './newcar.page';

describe('NewcarPage', () => {
  let component: NewcarPage;
  let fixture: ComponentFixture<NewcarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewcarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
