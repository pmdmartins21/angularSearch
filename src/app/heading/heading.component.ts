import { Component, OnInit } from '@angular/core';
import { ImageServiceService } from '../services/image-service.service';
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {

  faHatWizard = faHatWizard;
  searchText : string = '';

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  search():void {
    this.searchText == '' ? console.log("Vazio") : this.router.navigate(['/search',this.searchText]) 
  }

}
