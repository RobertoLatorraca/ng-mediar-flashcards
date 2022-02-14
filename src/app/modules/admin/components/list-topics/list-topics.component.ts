import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic/topic.service';

@Component({
  selector: 'app-list-topics',
  templateUrl: './list-topics.component.html',
  styleUrls: ['./list-topics.component.scss']
})
export class ListTopicsComponent implements OnInit {

  topics!: Topic[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private topicService: TopicService) { }

  ngOnInit(): void {
    this.loadTableData();
  }

  loadTableData(): void {
    this.topicService.findAll().subscribe(
      (resp: Topic[]) => this.topics = resp
    );
  }

  addTopic(): void {
    this.router.navigate(['./add'], { relativeTo: this.route });
  }

  editTopic(topic: Topic): void {
    this.router.navigate(['./edit', topic.id], { relativeTo: this.route })
  }

  toggleTopicEnabled(topic: Topic): void {
    let clone: Topic = JSON.parse(JSON.stringify(topic));
    clone.enabled = !topic.enabled;
    this.topicService.save(clone).subscribe(
      () => this.loadTableData()
    );
  }

}
