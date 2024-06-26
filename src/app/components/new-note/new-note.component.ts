import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/interfaces/note.interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss'],
})
export class NewNoteComponent implements OnInit {
  @Output() newNote = new EventEmitter<Note>();

  displayErrorMessage = false;
  formGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.formGroup.valueChanges.subscribe(() => {
      this.displayErrorMessage = false;
    });
  }

  handleCreateNote() {
    if (this.formGroup.valid) {
      this.newNote.emit({
        id: uuidv4(),
        title: this.removeWhitespace(
          this.formGroup.controls.title.value as string
        ),
        content: this.removeWhitespace(
          this.formGroup.controls.content.value as string
        ),
      });
      this.formGroup.reset();
    } else {
      this.displayErrorMessage = true;
    }
  }

  removeWhitespace(text: string) {
    return text.trim();
  }
}
