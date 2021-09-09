import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
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

  constructor(private fb:FormBuilder) {}

  ngOnInit(): void {
  
  }

  ngOnChanges() {   
    this.myFormGroup = this.creatForm(this.schema) ;
    // console.log(this.myFormGroup.controls)
  }


  creatForm(schema: ObjectSchema ) {
    const controls: any = {};
    const allies:any = {};
    schema.properties.forEach(items => {
      const required = true;
      if(items.type == 'string' || items.type == 'number'){
        controls[items.name] = this.getControl(items)
      }else if(items.type == 'array'){
        controls[items.name] =  new FormArray([ 
       this.creatForm(items.item)
       ])
      }else if(items.type == 'object'){
        controls[items.name] = this.creatForm(items)
      }else if( items.type == 'boolean'){
        controls[items.name] = new FormControl('')
      }else if(items.type == 'enum'){
        controls[items.name] = new FormControl('')
      }
    });
    
    return new FormGroup(controls);
  }
 

  // проверка на валидацию
  getControl(control :any){
    if(control.required) return new FormControl('', Validators.required)
    else return new FormControl('');
  }

  // получаем массив
  getArray(myFormGroup: FormGroup, nameArray: string){
    return myFormGroup.get(nameArray) as FormArray;
    
  }

 // добавляем элемент с массива
 addAlias(array: FormArray,name?: string) {
  // console.log(array)
  // array.push(this.fb.control(''));
  const student = this.fb.group({
    technology: ['', Validators.required],
    experience: ['', Validators.required]
  });
  array.push(student);
}


// удаляем элемент с массива

removeAllies(nameArray:FormArray,index: number) {
  nameArray.removeAt(index);
}
  
  handleSubmit(event: Event) {
    if(!this.myFormGroup.valid){
      event.preventDefault()
      }
      else this.onSubmit.emit(this.myFormGroup.value)
  }

}
