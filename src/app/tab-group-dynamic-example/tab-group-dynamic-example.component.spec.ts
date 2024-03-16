import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGroupDynamicExampleComponent } from './tab-group-dynamic-example.component';

describe('TabGroupDynamicExampleComponent', () => {
  let component: TabGroupDynamicExampleComponent;
  let fixture: ComponentFixture<TabGroupDynamicExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabGroupDynamicExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabGroupDynamicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
