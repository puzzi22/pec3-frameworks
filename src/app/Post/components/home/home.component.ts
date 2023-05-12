import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('listCardAnimation', [
      transition('* => *', [
        query(
          ':enter',
          style({
            opacity: 0,
          }),
          { optional: true }
        ),
        query(
          ':enter',
          stagger('300ms', [
            animate(
              '.8s ease-in',
              keyframes([
                style({
                  opacity: 0,
                  transform: 'translateY(-30px)',
                  offset: 0,
                }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(20px)',
                  offset: 0.3,
                }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
              ])
            ),
          ]),
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class HomeComponent {
  posts: PostDTO[];
  showButtons: boolean;

  private userId: string;

  constructor(
    private postService: PostService,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {
    this.userId = '';
    this.posts = new Array<PostDTO>();
    this.showButtons = false;

    this.store.select('auth').subscribe((auth) => {
      this.showButtons = false;

      if (auth.credentials.user_id) {
        this.userId = auth.credentials.user_id;
      }
      if (auth.credentials.access_token) {
        this.showButtons = true;
      }
    });

    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.store.dispatch(PostsAction.getPosts());
  }

  like(postId: string): void {
    let errorResponse: any;

    this.postService.likePost(postId).subscribe(
      () => {
        this.loadPosts();
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  dislike(postId: string): void {
    let errorResponse: any;

    this.postService.dislikePost(postId).subscribe(
      () => {
        this.loadPosts();
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }
}
