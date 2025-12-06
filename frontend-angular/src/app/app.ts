import { Component, OnInit } from '@angular/core';
import { AppLayout } from "./components/app-layout/app-layout";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [AppLayout]
})
export class App {
}
