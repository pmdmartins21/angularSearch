import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Photo } from 'src/models/photo.model';
import { ImageServiceService } from '../services/image-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchText: {
    query: string
    page: number
  }
  images:any = [];
  newImages:Photo[];
  totalPages:number;


  searchUrl = "https://api.unsplash.com/search/photos?per_page=24&query=";
  pageUrl = "&page="
  apiKey = "&client_id=KKu0hH-tHt0kR5wLLl28sJpsyzYj8bZEOMtexV1L4Jc";

  constructor(private activeroute:ActivatedRoute, private service:ImageServiceService, private router:Router) { }

  ngOnInit(): void {
    let query = this.activeroute.snapshot.params['query'];
    let page = this.activeroute.snapshot.params['page'];
    this.searchText = { 
      query: query,
      page: page
    }

    this.activeroute.params.subscribe( (params) => {
      this.searchText = {
        query:params['query'],
        page:params['page']
      }

      this.service.getPhoto(`${this.searchUrl}${this.searchText.query}${this.pageUrl}${this.searchText.page}${this.apiKey}`)
      .subscribe((resp) => {
        if(resp.length == 0) {this.router.navigate(['/not-found'])}
        this.newImages = resp;

      },)
    })
  }
}
