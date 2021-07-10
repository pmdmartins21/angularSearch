import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from 'src/models/photo.model';
import { map } from 'rxjs/operators';


 
@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  Favorites:Photo[] =[];
  totalPages:number;

  latestImageUrl = "https://api.unsplash.com/photos?per_page=24&page=2&order_by=latest&client_id=KKu0hH-tHt0kR5wLLl28sJpsyzYj8bZEOMtexV1L4Jc";
  apiKey = "&client_id=KKu0hH-tHt0kR5wLLl28sJpsyzYj8bZEOMtexV1L4Jc";
  searchUrl = "https://api.unsplash.com/search/photos?per_page=24&query=";

  constructor(private http:HttpClient) { }


  getPhoto(url:string):Observable<Photo[]> {
    return this.http.get(url)
      .pipe( map( (resp)=> {
        return this.convertPhotos(resp);
      }));
  }

  
convertPhotos(httpresponse) :Photo[] {
  let photosResponse = httpresponse.results;
  let photos = [];
  let arrayLength = httpresponse.length;
  let i = 0;
  if (photosResponse === undefined) { //Pedidos sem results (details e latest)
    if (arrayLength === undefined) { //Pedidos details
      let id = httpresponse.id
      let image_url = httpresponse.urls.raw;
      let title:string;
      httpresponse.description == null? title = httpresponse.alt_description : title = httpresponse.description;
      let author = httpresponse.user.name;
      let date =new Date(httpresponse.created_at) 
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let date_added = `${day}-${month}-${year}`;
      let likes = httpresponse.likes;
      let downloads = httpresponse.downloads;
      let tags:string[] = [];
      for(i=0; i<httpresponse.tags.length;i++) {
        let title =httpresponse.tags[i].title; 
        tags.push(title) ;
      }
      let favorite = false;

      photos.push(new Photo(id,image_url,title,author,date_added,likes,downloads,tags,favorite));
      return photos;
      }
      
    else { //Pedidos latest
      for (i=0; i<arrayLength; i++) {
        let id = httpresponse[i].id
        let image_url = httpresponse[i].urls.raw;
        let title:string;
        httpresponse[i].description == null? title = httpresponse[i].alt_description : title = httpresponse[i].description;
        let author = httpresponse[i].user.name;
        let date =new Date(httpresponse[i].created_at) 
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let date_added = `${day}-${month}-${year}`
        let likes = httpresponse[i].likes;
        let downloads = httpresponse[i].downloads;
        let tags = null;
        let favorite = false;
  
        photos.push(new Photo(id,image_url,title,author,date_added,likes,downloads,tags,favorite));
      }
      return photos;
    }
    
  }
  else { //pedidos search
    this.totalPages = httpresponse.total_pages;
    for (i=0; i<photosResponse.length; i++) {
      let id = photosResponse[i].id;
      let image_url = photosResponse[i].urls.raw;
      let title:string;
      photosResponse[i].description === null? title = photosResponse[i].alt_description : title = photosResponse[i].description;
      let author = null;
      let date =new Date(photosResponse[i].created_at) 
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let date_added = `${day}-${month}-${year}`
      let likes = null;
      let downloads = null;
      let tags = null;
      let favorite = false;

      photos.push(new Photo(id,image_url,title,author,date_added,likes,downloads,tags,favorite));
    }
      return photos;
    }
  }

  checkFavorite(photo:Photo):number {
    for (let i = 0; i < this.Favorites.length; i++) {
      if (photo.id === this.Favorites[i].id) {
          return i;
      } 
    }
    return -1;
  }
  
  toggleFavorite(photo:Photo, index:number):void {
    photo.favorite = !photo.favorite;
    index < 0 ? this.Favorites.push(photo):this.Favorites.splice(index,1);
  }
}