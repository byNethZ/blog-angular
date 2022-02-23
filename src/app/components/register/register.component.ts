import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  constructor() { 
    this.page_title = 'Registrate'
  }

  ngOnInit(): void {
    console.log('Componente de registro lanzado');
  }

}
