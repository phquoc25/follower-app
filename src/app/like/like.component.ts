import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  @Input('likes-count') likesCount: number;
  @Input('is-active') isActive: boolean;

  @Output() change = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClicked() {
    this.change.emit();
    this.likesCount += this.isActive ? 1 : -1;
    this.isActive = !this.isActive;
    console.log(this.likesCount);
    console.log(this.isActive);
  }

}
