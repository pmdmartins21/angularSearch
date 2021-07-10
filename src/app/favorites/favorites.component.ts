import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/models/photo.model';
import { ImageServiceService } from '../services/image-service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  Favorites:Photo[] = [];

  constructor(private service:ImageServiceService) { }

  ngOnInit(): void {
    this.Favorites = this.service.Favorites;
  }

}
