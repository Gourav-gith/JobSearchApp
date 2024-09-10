import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RecruiterService } from '../recruiter.service';
import { JobType, JobTypeResponse, Managejob, ManagejobResponse, Pagination } from 'src/app/model/recruiter.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-jobs-page',
  templateUrl: './manage-jobs-page.component.html',
  styleUrls: ['./manage-jobs-page.component.css']
})
export class ManageJobsPageComponent implements OnInit {
  manageJob !: Array<Managejob>
  job_title !: Array<Managejob>
  jobTypeData !: Array<JobType>
  pagination !: Pagination

  // totalJobs: number | undefined = undefined;

  totalJobs = {
    allJobs: 0,
    active: 0,
    inactive: 0,
    draft: 0,
    underReview: 0
  }

  // api pagination


  selectedButton: string = 'AllJobs';
  selectButton(buttonName: string) {
    this.selectedButton = buttonName;
    console.log(this.selectedButton);
    this.featchHeaderJobs(buttonName)


    if (buttonName == 'AllJobs') {
      this.managejobs()
    }



  }

  featchHeaderJobs(button: string) {
    this._service.headerManageJobs(button).subscribe((response: ManagejobResponse) => {
      this.manageJob = response.data?.job_data as Array<Managejob>
      this.pagination = response.data?.pagination as Pagination
      if (button == "Under Review") {
        this.totalJobs.underReview = this.pagination.total!
      }
      if (button == "Draft") {
        this.totalJobs.draft = this.pagination.total!
      }
      if (button == "Inactive") {
        this.totalJobs.inactive = this.pagination.total!
      }
      if (button == "Active") {
        this.totalJobs.active = this.pagination.total!
      }

    })

  }


  truncateText(text: string | undefined, maxLength: number): string {
    if (!text) {
      return ''; // Or any default value you prefer
    }
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + '...';
    }
  }
  constructor(private _service: RecruiterService, private router: Router) {
    this.featchHeaderJobs('Under Review')
    this.featchHeaderJobs('Draft')
    this.featchHeaderJobs('Inactive')
    this.featchHeaderJobs('Active')
  }

  ngDoCheck(): void {
    // this.managejobs()
  }

  ngOnInit() {
    this.managejobs()
    this._service.entitySearch('job_type').subscribe((response: JobTypeResponse) => {
      this.jobTypeData = response.data as Array<JobType>
      // console.log(response);
    })

  }

  jobTypeChange(event: any) {
    console.log(event.target.value);
    const value = event.target.value
    this.fetchJobType(value)
    if (value == 'Job Type') {
      this.managejobs()
    }

  }

  startDate: string = ''; // Initialize start date
  endDate: string = '';
  onStartDate(event: any) {
    console.log(event.target.value);
    this.startDate = event.target.value

  }
  onEndDate(event: any) {
    console.log(event.target.value);
    this.endDate = event.target.value
    this.fetchStartEndDate()

  }

  fetchStartEndDate() {
    if (this.startDate && this.endDate) {
      this._service.searchfromToDate(this.startDate, this.endDate).subscribe((response: ManagejobResponse) => {
        // console.log('date',response);
        this.manageJob = response.data!.job_data as Array<Managejob>
      })
    }
  }

  onInputChange(event: any) {
    const value = event.target.value

    if (value.length >= 3) {
      this.fetchJobTitle(value);
    }
    if (value.length == 1) {
      this.managejobs()
    }
    if (value.length == 2) {
      this.managejobs()
    }

    if (value.length == 0) {
      this.managejobs()
    }

    else {
      this.manageJob = [];
    }
  }

  postDateChange(event: any) {
    const value = event.target.value
    console.log(value);
    this.fetchJobPost(value)
  }

  managejobs() {
    this._service.manageJob().subscribe((response: ManagejobResponse) => {
      console.log(response);
      this.manageJob = response.data?.job_data as Array<Managejob>
      this.pagination = response.data?.pagination as Pagination
    })
  }


  fetchJobTitle(value: string) {
    this._service.searchJobTitle(value).subscribe((response: ManagejobResponse) => {
      // console.log(response.data);
      this.manageJob = response.data?.job_data as Array<Managejob>
    })

  }

  fetchJobType(value: string) {
    this._service.searchJobType(value).subscribe((response: ManagejobResponse) => {
      // console.log(response);
      this.manageJob = response.data?.job_data as Array<Managejob>
    })

  }

  fetchJobPost(value: string) {
    this._service.searchPostDate(value).subscribe((response: ManagejobResponse) => {
      // console.log(response);
      this.manageJob = response.data?.job_data as Array<Managejob>


    })
  }

  postjob() {
    this.router.navigate(['recruiter-postjob1'])
  }

  paginationNext(url: string) {
    console.log((url));
    if (url) {
      let pageNo = Number(url.split("page=")[1])
      this._service.paggination(pageNo).subscribe((res: ManagejobResponse) => {
        if (res && res.data && res.data.job_data && res.data.pagination) {
          this.manageJob = res.data.job_data as Array<Managejob>;
          this.pagination = res.data.pagination as Pagination;
        }
        // console.log(this.manageJob)      
      })
    }
  }

  paginationPre(url: string) {
    if (url) {
      let pageNo = Number(url.split("page=")[1])
      console.log(pageNo);
      this._service.paggination(pageNo).subscribe((res: any) => {
        if (res && res.data && res.data.job_data && res.data.pagination) {
          this.manageJob = res.data.job_data as Array<Managejob>;
          this.pagination = res.data.pagination as Pagination;
        }
      })
    }

  }

  handleBtn(id: string | number | undefined) {
    console.log(id);
    this.router.navigate(['/recruiter-job-preview', id])

  }

  jobTitleBtn(id: string | number | undefined) {
    // console.log(id);

    this.router.navigate(['/recruiter-manage-candidate', id])
  }

}





