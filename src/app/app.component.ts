import { Component, OnChanges, OnInit } from '@angular/core';
import { ImagePaths } from './assets/image-path';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(public imagePaths: ImagePaths) {}

  ngOnInit(): void {}
}
