import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NewNoteComponent } from './components/new-note/new-note.component';
import { NoteComponent } from './components/note/note.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Note } from './interfaces/note.interface';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AppComponent, NewNoteComponent, NoteComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  describe('handleDeleteNote', () => {
    let mockNote = {
      id: '123',
      title: 'blah blah',
      content: 'blah blah blah blah',
    };

    beforeEach(() => {
      component.noteLimitReached = true;
      component.notes = [
        mockNote,
        {
          id: '234',
          title: 'blah blah',
          content: 'blah blah blah blah',
        },
        {
          id: '345',
          title: 'blah blah',
          content: 'blah blah blah blah',
        },
      ];
    });

    it('should remove the given note passed into the function', () => {
      component.handleDeleteNote(mockNote);

      // making sure the exact note we deleted doesn't exist in the notes array
      expect(component.notes.find((note) => note.id === mockNote.id)).toEqual(
        undefined
      );
      // making sure there is only 1 note now
      expect(component.notes.length).toEqual(2);
    });

    it('should update the note count', () => {
      component.handleDeleteNote(mockNote);

      expect(component.notesCount).toEqual('2/3');
    });

    it('should set noteLimitReached to false', () => {
      component.handleDeleteNote(mockNote);

      expect(component.noteLimitReached).toEqual(false);
    });
  });

  describe('handleCreateNote', () => {
    describe('when the note limit has been reached', () => {
      beforeEach(() => {
        component.notes = [
          {
            id: '123',
            title: 'qwer',
            content: 'qwerqwer',
          },
          {
            id: '124',
            title: 'qwer',
            content: 'qwerqwer',
          },
          {
            id: '126',
            title: 'qwer',
            content: 'qwerqwer',
          },
        ];
      });

      it('should not add a new note', () => {
        component.handleCreateNote({
          id: '1223',
          title: 'qwer',
          content: 'qwerqwer',
        });

        expect(component.notes.length).toEqual(3);
        expect(
          component.notes.includes({
            id: '1223',
            title: 'qwer',
            content: 'qwerqwer',
          })
        ).toBeFalse();
      });

      it('should set noteLimitReached to true', () => {
        component.handleCreateNote({
          id: '1223',
          title: 'qwer',
          content: 'qwerqwer',
        });

        expect(component.noteLimitReached).toBeTrue();
      });
    });

    describe('when the note limit has NOT been reached', () => {
      beforeEach(() => {});

      it('should add a new note', () => {});

      it('should update the note count', () => {});
    });
  });
});
