import { Component } from '@angular/core';
import { CommentsService } from '../../../services/comments/comments.service';

@Component({
  selector: 'app-admin-comment',
  templateUrl: './admin-comment.component.html',
  styleUrls: ['./admin-comment.component.css'],
})
export class AdminCommentComponent {
  comments: any[] = [];

  p: number = 1;

  constructor(private commentsService: CommentsService) {
    this.commentsService.getAllComments().subscribe((cmt) => {
      this.comments = cmt.data;
      console.log(cmt.data);
    });
  }
}
