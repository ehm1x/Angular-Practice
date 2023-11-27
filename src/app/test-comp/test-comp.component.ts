import { Component } from '@angular/core';

@Component({
  selector: 'app-test-comp',
  templateUrl: './test-comp.component.html',
  styleUrls: ['./test-comp.component.css']
})
export class TestCompComponent {
  name:string = ''; 
  email:string = '';
  message:string = '';  
  phone:string = '';

}