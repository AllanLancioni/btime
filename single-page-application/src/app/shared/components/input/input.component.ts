import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() type: 'text' | 'number' | 'email' = 'text';
  @Input() classInput: any = 'form-control';
  @Input() label: any = '';
  @Input() name: any = '';
  @Input() placeholder: any = '';
  @Input() required: Boolean = false;

  modelValue = '';
  @Output() modelChange = new EventEmitter();

  @Input()
  get model() {
    return this.modelValue;
  }

  set model(val) {
    this.modelValue = val;
    this.modelChange.emit(this.modelValue);
  }

  constructor() { }

  ngOnInit() {
  }

  isInvalid(prop) {
    return false;
  }

}
