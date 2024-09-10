import { Component } from '@angular/core';
import { PopularJobs, PopularJobsResponce } from 'src/app/model/workassist.modal';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-popular-jobs',
  templateUrl: './popular-jobs.component.html',
  styleUrls: ['./popular-jobs.component.css']
})
export class PopularJobsComponent{
  cards: string[] = ['Card 1', 'Card 2', 'Card 3']; // Add more cards as needed
  currentIndex: number = 0;
  translateX: number = 0;

  popularJobsList !: Array<PopularJobs>
  value !: any

  constructor(
    private dataService : DataService
  ) { 
    // if(!this.jobsByCatagoryList){
    //   this.jobsByCatagoryList = [] as Array <JobsByCatagories>
    // }
  }

  ngOnInit(): void {
    this.showSlide(this.currentIndex);


    this.dataService.popularJobsSearch().subscribe((res : PopularJobsResponce)=>{
      this.popularJobsList = res.data?.data as Array<PopularJobs>
      console.log(this.popularJobsList)
    })
  }

  showLocationOnTitle(locationList: any) {
    let value
    for (let index = 0; index < locationList.length; index++) {
      let element = locationList[index];
      if (value) {
        value = value + ' , ' + element.city_name
      } else {
        value = element.city_name
      }
    }
    return value

  }

  showSlide(index: number): void {
    if (index < 0) {
      this.currentIndex = this.cards.length - 1;
    } else if (index >= this.cards.length) {
      this.currentIndex = 0;
    }
    this.translateX = -this.currentIndex * 100;
  }

  prevSlide(): void {
    this.currentIndex--;
    this.showSlide(this.currentIndex);
  }

  nextSlide(): void {
    this.currentIndex++;
    this.showSlide(this.currentIndex);
  }







}



