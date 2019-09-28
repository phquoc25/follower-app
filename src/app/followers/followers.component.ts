import { Component, OnInit } from '@angular/core';
import { FollowersService } from '../services/followers.service';
import { NotFoundError } from '../common/not-found-error';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  followers;
  constructor(
    private route: ActivatedRoute,
    private followersService: FollowersService) { }

  ngOnInit() {
    Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
    .switchMap(combined => {
        const id = combined[0].get('id');
        console.log(id);
        const page = combined[1].get('page');
        console.log(page);
        return this.followersService.getAll();
    })
    .subscribe(followers => this.followers = followers);

    this.route.paramMap
      .subscribe(params => {

      });

    this.route.queryParamMap
      .subscribe(params => {

      });

    this.followersService.getAll()
      .subscribe(
        followers => this.followers = followers,
        error => {
          if (error instanceof NotFoundError) {
            alert('No follower found');
          } else { throw error; }
        }
      );
  }

}
