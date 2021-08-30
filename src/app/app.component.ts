import { Component } from '@angular/core';
import { studentProfileSchema } from './schemas/student-profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-form-builder';

  schema = studentProfileSchema;

  handleSubmit(values: any) {
    console.log(values);
  }
}
