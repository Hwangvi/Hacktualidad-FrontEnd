import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../../core/service/forum.service';
import { Topic } from '../../../shared/interfaces/forum';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topic-moderation-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './topicModerationList.component.html',
  styleUrls: ['./topicModerationList.component.css']
})
export class TopicModerationListComponent implements OnInit {
  topics: Topic[] = [];
  isLoading = true;

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.forumService.getAllTopics().subscribe({
      next: (data) => {
        this.topics = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al cargar las temáticas", err);
        this.isLoading = false;
      }
    });
  }
}
