import { Component, signal } from '@angular/core';
import { AppLayout } from "./components/app-layout/app-layout";


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [AppLayout]
})
export class App {

}
