import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostService } from 'src/app/Post/services/post.service';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../../Post/actions';
import { PostDTO } from '../../../Post/models/post.dto';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() post: PostDTO = new PostDTO('', '', 0, 0, new Date());
  @Input() showButtons = true;

  constructor(
    private postService: PostService,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {}

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
