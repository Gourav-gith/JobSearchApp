import { Component, Inject } from '@angular/core';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { DataService } from 'src/app/service/data.service';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';


@Component({
  selector: 'app-employment-details',
  templateUrl: './employment-details.component.html',
  styleUrls: ['./employment-details.component.css']
})
export class EmploymentDetailsComponent {

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<null, any>,
    private dataService : DataService
  ){}

  cancel(){
    // this.personalDetails = {}
    this.context.completeWith(null);
  }

}
