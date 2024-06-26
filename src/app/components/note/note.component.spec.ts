import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteComponent } from './note.component';

const mockNote = {
  id: '123',
  title: 'mock-title',
  content: 'mock-content',
};

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteComponent],
    });
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    component.note = mockNote;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
