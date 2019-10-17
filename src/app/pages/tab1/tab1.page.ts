import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  habilitarScroll = false;

  constructor(private post: PostsService) {

  }

  ngOnInit(): void {
    this.siguientes();
  }

  siguientes(event?: any, pull: boolean = false) {
    this.post.getPosts(pull).subscribe( res => {
      console.log('respuesta', res);
      this.posts.push(...res.posts);

      if (event) {
        event.target.complete();
        if (res.posts.length === 0) {
          this.habilitarScroll = true;
        }
      }
    });
  }

  recargar(event: any) {
    this.habilitarScroll = false;
    this.posts = [];
    this.siguientes(event, true);
  }
}
