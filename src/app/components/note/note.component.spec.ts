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

  describe('handleDeleteNote', () => {
    let mockNote = {
      id: '123',
      title: 'title',
      content: 'content',
    };

    beforeEach(() => {
      component.note = mockNote;
    });

    it('should emit an event from the delete event emitter', () => {
      // this is something we didn't get time to go over
      // here we are using the spyOn method to watch for any calls to the emit method on the delete event emitter
      const deleteSpy = spyOn(component.delete, 'emit');

      component.handleDeleteNote();

      // we then expect that the deleteSpy has been called with the argument mockNote
      expect(deleteSpy).toHaveBeenCalledOnceWith(mockNote);
    });
  });
});
