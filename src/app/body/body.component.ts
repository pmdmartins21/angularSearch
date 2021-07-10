import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/models/photo.model';
import { ImageServiceService } from '../services/image-service.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  images:any =[];
  newImages:Photo[];

  constructor(private imageService:ImageServiceService) { }

  ngOnInit(): void {
    this.imageService.getPhoto("https://api.unsplash.com/photos?per_page=24&page=2&order_by=latest&client_id=KKu0hH-tHt0kR5wLLl28sJpsyzYj8bZEOMtexV1L4Jc").subscribe(resp=> {
      this.newImages = resp;
    })
  }

}
