import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewcitaPage } from './newcita.page';

describe('NewcitaPage', () => {
  let component: NewcitaPage;
  let fixture: ComponentFixture<NewcitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcitaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewcitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
