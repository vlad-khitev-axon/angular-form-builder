import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
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
  
  }

  ngOnChanges() {   
    this.myFormGroup = this.creatForm(this.schema) ;
    console.log(this.myFormGroup.controls)
  }


  creatForm(schema: ObjectSchema ) {
    const controls: any = {};
    const allies:any = {};
    schema.properties.forEach(items => {
      const required = true;
      if(items.type == 'string' || items.type == 'number' || items.type == 'enum' || items.type == 'boolean'){
        controls[items.name] = required ? new FormControl('' , Validators.required)
        : new FormControl('')
      }

      else if(items.type == 'array'){
        controls[items.name] =  new FormArray([
          this.formGroupCreat(items.item.name, items.item)
      //  this.creatForm(items.item)

       ])
      }
      else if(items.type == 'object'){
        controls[items.name] = this.creatForm(items)
       
      }
    });
    
    return new FormGroup(controls);
  }

  // создаем группу 
  formGroupCreat(key: string, schema: ObjectSchema){
    return new FormGroup({ 
      [key]: this.creatForm(schema)})
  }

  // получаем массив
  getArray(myFormGroup: FormGroup, nameArray: string){
    return this.myFormGroup.get(nameArray) as FormArray;
    
  }

  

  
  handleSubmit(event: Event) {
    if(!this.myFormGroup.valid){
      event.preventDefault()
      }
      else this.onSubmit.emit(this.myFormGroup.value)
  }

}
