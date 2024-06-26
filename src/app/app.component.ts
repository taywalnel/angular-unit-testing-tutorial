import { Component, OnInit } from '@angular/core';
import { Note } from './interfaces/note.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-unit-testing-tutorial';
  notes: Note[] = [];
  noteLimitReached = false;
  maxAllowedNotes = 3;
  notesCount = '';

  ngOnInit() {
    this.setNoteCount(this.notes);
  }

  handleDeleteNote(noteToDelete: Note) {
    this.notes = [...this.notes].filter((note) => note.id !== noteToDelete.id);
    this.noteLimitReached = false;
    this.setNoteCount(this.notes);
  }

  setNoteCount(notes: Note[]) {
    this.notesCount = `${notes.length}/${this.maxAllowedNotes}`;
  }

  handleCreateNote(note: Note) {
    if (this.notes.length < this.maxAllowedNotes) {
      this.notes.push(note);
      this.setNoteCount(this.notes);
    } else {
      this.noteLimitReached = true;
    }
  }
}
