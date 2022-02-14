import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  routeConfig!: any;

  constructor(private router: Router) {
    this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: any) => event.snapshot.firstChild === null),
      map((event: any) => event.snapshot)
    )
    .subscribe(
      (event: any) => {
        this.routeConfig = event;
        if (!event.data.title) {
          this.routeConfig.data = {title: 'Sin título en routing module'}
        }
        console.log(this.routeConfig)
      }
    );
  }

  ngOnInit(): void {
  }

}
