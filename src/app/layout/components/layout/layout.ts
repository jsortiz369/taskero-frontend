import { Component } from '@angular/core';
import { Topbar } from '../topbar/topbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Topbar],
  templateUrl: './layout.html',
})
export class Layout {}
