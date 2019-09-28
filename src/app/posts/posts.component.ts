import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { AppErrorHandler } from '../common/app-error-handler';
import { e } from '@angular/core/src/render3';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private postService: PostService) {

  }

  ngOnInit() {
    this.postService.getAll()
    .subscribe(posts => this.posts = posts);
  }

  createPost(input: HTMLInputElement) {
    const post = {title: input.value};
    this.posts.splice(0, 0, post);

    input.value = '';

    this.postService.create(post)
      .subscribe(
        newPost => {
          post['id'] = newPost.id;
        },
        (error: AppError) => {
          this.posts.splice(0, 1);
          throw error;
        });
  }

  updatePost(post) {
    this.postService.update(post)
      .subscribe(
        updatedPost => {
          console.log(updatedPost);
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            alert('Resource not found');
          } else {
            throw error;
          }
        });
  }

  deletePost(post) {
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.postService.delete(post.id)
      .subscribe(
        null,
        (error: Response) => {
          this.posts.splice(index, 0, post);

          if (error.status === 404) {
            alert('The post has already been deleted.');
          } else {
            throw error;
          }
        });
  }
}
