import { Component, OnInit, Input } from '@angular/core';
import { Article, post, Tag } from '../../interfaces/interfaces';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  @Input() posts: post[];
  @Input() enFavoritos: boolean;


  constructor() { }

  ngOnInit() {
    //console.log(this.posts)
  }

}
