import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-comment',
  templateUrl: './admin-comment.component.html',
  styleUrls: ['./admin-comment.component.css'],
})
export class AdminCommentComponent {
  comments: any[];

  p: number = 1;

  constructor() {
    this.comments = Array(14).fill(0);
  }
}
