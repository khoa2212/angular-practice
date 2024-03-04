import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css',
})
export class ToggleComponent implements OnInit {
  constructor(private storage: Storage) {}

  class: string = '';

  isDark: boolean = false;

  onChange(event: any) {
    if (event.target.checked) {
      this.storage.setItem('theme', 'light');
      this.isDark = false;
      document.documentElement.classList.remove('dark');
    } else {
      this.storage.setItem('theme', 'dark');
      this.isDark = true;
      document.documentElement.classList.add('dark');
    }
  }

  ngOnInit(): void {
    this.isDark = (this.storage.getItem('theme') ?? 'light') === 'dark';

    if(this.isDark) {
      document.documentElement.classList.add('dark');
    }
    else {
      document.documentElement.classList.remove('dark');
    }
  }

  @HostBinding('class.dark') getMode() {
    return this.isDark;
  }
}
