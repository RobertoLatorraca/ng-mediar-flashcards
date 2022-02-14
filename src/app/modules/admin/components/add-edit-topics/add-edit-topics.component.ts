import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic/topic.service';

@Component({
  selector: 'app-add-edit-topics',
  templateUrl: './add-edit-topics.component.html',
  styleUrls: ['./add-edit-topics.component.scss']
})
export class AddEditTopicsComponent implements OnInit {

  topicForm = new FormGroup({
    topic: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  });
  isEditMode: boolean = false;
  id!: string;
  topic: Topic = new Topic();

  constructor(private topicService: TopicService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.isEditMode = true;
      this.topicService.findById(this.id).subscribe(
        (resp: Topic) => {
          this.topicForm.patchValue(resp);
          this.topic = resp;
        },
        (err: any) => this.router.navigate(['../../'], { relativeTo: this.route })
      );
    }
  }

  onSubmit(): void {
    this.topic.topic = this.topicForm.get('topic')?.value;
    this.topicService.save(this.topic).subscribe(
      () => {
        this.isEditMode ?
        this.router.navigate(['../../'], { relativeTo: this.route }) :
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    );
  }

}
