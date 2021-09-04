import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { ObjectSchema } from './core/types'

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  // Do not modify this property
  @Input() schema!: ObjectSchema

  // Do not modify this property
  @Output() onSubmit = new EventEmitter<any>()

  myFormGroup!:FormGroup

  constructor() {}

  ngOnInit(): void {
    this.myFormGroup = this.toFormGroup(this.schema)
  }

  toFormGroup(schema: ObjectSchema ) {
    const group: any = {};

    schema.properties.forEach(items => {
      // console.log(question)
      if(items.type == 'string' || items.type == 'number' || items.type == 'enum' || items.type == 'boolean'){
        group[items.name] = new FormControl() 
      }
      else if(items.type == 'array'){
       group[items.name] = new FormArray([])
      }
      else if(items.type == 'object'){
        group[items.name] = new FormControl() 
      }
      
    });
    return new FormGroup(group);
  }


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
