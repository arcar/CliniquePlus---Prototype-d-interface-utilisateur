import { Component, signal } from '@angular/core';
import { Userservice } from './userservice';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from './header/header';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(protected userService : Userservice) {

  }
  
}
