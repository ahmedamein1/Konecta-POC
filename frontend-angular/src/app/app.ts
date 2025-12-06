import { Component, OnInit } from '@angular/core';
import { AppLayout } from "./components/app-layout/app-layout";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [AppLayout]
})
export class App implements OnInit {

  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    this.toastr.success('Hello');
  }
}
