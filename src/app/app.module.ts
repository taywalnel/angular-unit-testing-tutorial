import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoteComponent } from './components/note/note.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewNoteComponent } from './components/new-note/new-note.component';

@NgModule({
  declarations: [AppComponent, NoteComponent, NewNoteComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
