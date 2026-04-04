import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  translate = inject(TranslateService);

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const savedLang = localStorage.getItem('lang') || 'en';
      this.translate.use(savedLang);
    } else {
      this.translate.use('en');
    }
  }
}
