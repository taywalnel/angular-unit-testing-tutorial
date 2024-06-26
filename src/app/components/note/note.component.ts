import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from 'src/app/interfaces/note.interface';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  @Input() note: Note;
  @Output() delete = new EventEmitter<Note>();

  handleDeleteNote() {
    this.delete.emit(this.note);
  }
}
