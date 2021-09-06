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
    this.myFormGroup = this.creatForm(this.schema)

   

    console.log(this.myFormGroup.controls)
  }

  creatForm(schema: ObjectSchema ) {
    const controls: any = {};

    schema.properties.forEach(items => {
      // console.log(question)
      if(items.type == 'string' || items.type == 'number' || items.type == 'enum' || items.type == 'boolean'){
        controls[items.name] = new FormControl('') 
      }
      else if(items.type == 'array'){
        controls[items.name] = new FormArray([
        this.creatForm(items.item)
       ])
      }
      else if(items.type == 'object'){
        controls[items.name] = this.creatForm(items)
        // items.properties.forEach(res => {
        //   controls[res.name] = new FormControl('')
        // })
        
      }
      
    });
    return new FormGroup(controls);
  }


  logVAlue(){
    console.log(this.myFormGroup.value)
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
