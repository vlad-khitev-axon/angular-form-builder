import { LogPipe } from './form-builder/pipe';
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { FormBuilderComponent } from './form-builder/form-builder.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [AppComponent, FormBuilderComponent, LogPipe],
  imports: [BrowserModule, BrowserAnimationsModule ,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
