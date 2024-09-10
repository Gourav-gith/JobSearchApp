import { Component, Inject } from '@angular/core';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { DataService } from 'src/app/service/data.service';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

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