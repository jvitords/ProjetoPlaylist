import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCompComponent } from './playlist-comp.component';

describe('PlaylistCompComponent', () => {
  let component: PlaylistCompComponent;
  let fixture: ComponentFixture<PlaylistCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistCompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaylistCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
