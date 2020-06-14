import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IProject } from '../interfaces/iproject';
import { IImage } from '../interfaces/iimage';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  projects = new BehaviorSubject<IProject[]>([])
  

  constructor(private http: HttpClient) {
    this.updateProjects();
  }

  updateProjects() {
    this.projects.next([]);
    this.http.get('https://api.github.com/users/neutralmike/repos')
      .subscribe((data: Array<any>) => {
        data.forEach(repo => {
          this.http.get(`https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/README.md`, {responseType: 'text'} )
            .subscribe(readme => {
              const images = readme.match(/!\[.*?\]\(.*?\)/gmi)
                .map(imageUrl => (
                  {
                    url: `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/${imageUrl.match(/\(.*?\)/)[0].slice(1, -1)}`
                  }
                ));
              this.projects.next([
                ...this.projects.value,
                {
                  images,
                  id: repo.id,
                  name: repo.name,
                  githubUrl: repo.html_url,
                  color: readme.match(/color: #.{6}/)?.[0].slice(7) ?? '#FFFFFF',
                  siteUrl: readme.match(/url: http.*?($|\s|\n)/gmi)?.[0].slice(5),
                }
              ]);
              console.log(this.projects.value)
            });
          });
      });
  }
}
