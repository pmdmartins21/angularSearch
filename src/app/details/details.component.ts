import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/models/photo.model';
import { ImageServiceService } from '../services/image-service.service';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  image:any;
  photoID: string;
  newImage:Photo = <Photo>{};
  favoriteIndex:number;
  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;

  
  
  url = "https://api.unsplash.com/photos/";
  apiKey = "/?client_id=KKu0hH-tHt0kR5wLLl28sJpsyzYj8bZEOMtexV1L4Jc"

  constructor(private service:ImageServiceService, private activeroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activeroute.params.subscribe( params => {
      this.photoID = params['id'];
    })
    
      this.service.getPhoto(this.url + this.photoID + this.apiKey)
      .subscribe(resp => {
        this.newImage = resp[0];
        this.favoriteIndex = this.service.checkFavorite(this.newImage);
        if (this.favoriteIndex>=0){this.newImage.favorite = true}
      })
  }

  toggleFavorite():void {  
    this.service.toggleFavorite(this.newImage, this.favoriteIndex); 
    this.favoriteIndex = this.service.checkFavorite(this.newImage);
    
  }

}