import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IProject } from '../interfaces/iproject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  projects: IProject[] = null;
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.projects.subscribe((projects: IProject[]) => {
      this.projects = projects.sort((a, b) => (b.id - a.id));
    })
  }

}
