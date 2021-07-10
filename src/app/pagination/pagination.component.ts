import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageServiceService } from '../services/image-service.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  searchText: {
    query: string
    page: number
  }

  @Input() totalPages;

  constructor(private activeroute:ActivatedRoute, private service:ImageServiceService) { }

  ngOnInit(): void {
    let query = this.activeroute.snapshot.params['query'];
    let page = this.activeroute.snapshot.params['page'];
    this.searchText = {
      query: query,
      page : page  
    };


    this.activeroute.params.subscribe( (params)=> {
      this.searchText = {
        query:params['query'],
        page:params['page']
      }

    })
  }

  previous():number {
    return Number(this.searchText.page) - 1;
    console.log(this.totalPages);
  }

  
  next():number {
    return Number(this.searchText.page) + 1;
  }

  firstPage():boolean {
    return false;
  }

  lastPage():boolean {
    return false;
  }

}
