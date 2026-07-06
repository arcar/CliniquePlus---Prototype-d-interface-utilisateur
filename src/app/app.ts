import { Component, signal } from '@angular/core';
import { Userservice } from './userservice';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Routes } from './routes';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(protected userService : Userservice, protected routes : Routes) {

  }
  
}
