import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectLoading } from 'src/app.selectors';
import { AppState } from './app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'blog-uoc-project-front';
  isLoading: Observable<boolean> = of(false); // assign a dummy observable

  constructor(private store: Store<AppState>) {} // use AppState as the type for Store

  ngOnInit() {
    this.isLoading = this.store.pipe(select(selectLoading)); // use the selector
  }
}
