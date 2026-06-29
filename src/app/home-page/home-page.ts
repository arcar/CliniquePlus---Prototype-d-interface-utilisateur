import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { Userservice } from '../userservice';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
   constructor(protected userService : Userservice) {

  }
}
