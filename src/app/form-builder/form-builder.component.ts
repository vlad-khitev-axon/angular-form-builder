import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { ObjectSchema } from './core/types'

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  @Input() schema!: ObjectSchema
  @Output() onSubmit = new EventEmitter<any>()

  constructor() {}

  ngOnInit(): void {}

  handleSubmit(event: Event) {
    event.preventDefault()

    // Here you have an event (of type SubmitEvent).
    // You can go two ways:
    // 1. Extract all form values from the event (so-called "uncontrolled form").
    // 2. Use form engine that is built into Angular.
    // Regardless of your choice, the goal is to submit all form values to `onSubmit` property.
    // The structure (shape) of values should match the schema.

    this.onSubmit.emit({})
  }
}
