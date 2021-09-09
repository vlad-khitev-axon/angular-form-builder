import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ObjectSchema } from '../form-builder/core/types';

@Component({
  selector: 'app-form-object',
  templateUrl: './form-object.component.html',
  styleUrls: ['./form-object.component.scss']
})
export class FormObjectComponent implements OnInit {

  @Input()
  forms!: FormGroup;  
  @Input() data!: ObjectSchema;

  constructor() { }

  ngOnInit(): void {
  }

}
