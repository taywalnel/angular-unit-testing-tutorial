import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNoteComponent } from './new-note.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('NewNoteComponent', () => {
  let component: NewNoteComponent;
  let fixture: ComponentFixture<NewNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [NewNoteComponent],
    });
    fixture = TestBed.createComponent(NewNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleCreateNote', () => {
    describe('when the formGroup is valid', () => {
      it('should emit an event from the newNote event emitter', () => {
        // this is how we mock the user typing some values into the input
        // here we are just setting the title and content form controls to have values
        // therefore the form validators should pass as the only validators are for each field to have a value
        component.formGroup.setValue({
          title: 'some title',
          content: 'some content',
        });

        const newNoteSpy = spyOn(component.newNote, 'emit');

        component.handleCreateNote();

        expect(newNoteSpy).toHaveBeenCalledOnceWith({
          // since the id is generated randomly each time we do not know what value will be set here
          // therefore we can add the jasmine.anything() function to say 'whatever this value is for id let the test pass'
          id: jasmine.anything(),
          title: 'some title',
          content: 'some content',
        });
      });

      it('should trim any leading or trailing whitespace', () => {
        // this time lets add some leading and trailing whitespace to confirm that it gets cleaned up by the removeWhitespace function
        component.formGroup.setValue({
          title: '     some title    ',
          content: '      some content    .',
        });

        const newNoteSpy = spyOn(component.newNote, 'emit');

        component.handleCreateNote();

        expect(newNoteSpy).toHaveBeenCalledOnceWith({
          id: jasmine.anything(),
          title: 'some title',
          content: 'some content    .',
        });
      });
    });

    describe('when the formGroup is NOT valid', () => {
      beforeEach(() => {
        // this time we want the validators to not pass
        // therefore we will not give the title a value

        component.formGroup.setValue({
          title: '',
          content: 'some content',
        });
      });

      it('should NOT emit an event from the newNote event emitter', () => {
        const newNoteSpy = spyOn(component.newNote, 'emit');

        component.handleCreateNote();

        expect(newNoteSpy).toHaveBeenCalledTimes(0);
      });

      it('should display the error message', () => {
        component.handleCreateNote();

        expect(component.displayErrorMessage).toBeTrue();
      });
    });
  });

  describe('when the user types a value into the form', () => {
    it('should hide the error message', () => {
      // initialize displayErrorMessage to true first so we can confirm that it is successfully being updated
      component.displayErrorMessage = true;

      component.formGroup.controls.title.patchValue('word');

      expect(component.displayErrorMessage).toBeFalse();
    });
  });
});
