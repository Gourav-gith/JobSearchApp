import { Component, Inject, OnInit } from '@angular/core';
import { RecruiterService } from '../recruiter.service';
import { PostJobStep3, PostJobStep3Response, ScreenQuestion, ScreenQuestionResponse } from 'src/app/model/recruiter.modal';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Router } from '@angular/router';

interface Question {
  enterQuestion: string;
  type: string | string[];
  isMandate: string;
  options: string[];

}


@Component({
  selector: 'app-post-job-step3',
  templateUrl: './post-job-step3.component.html',
  styleUrls: ['./post-job-step3.component.css']
})
export class PostJobStep3Component implements OnInit {
  isChecked: boolean = true;
  chk = '1'
  screenQuestion !: Array<ScreenQuestion>
  enterQuestion!: ''
  primaryresponsebility: string | null = null;
  currentQuestionIndex !: number
  postJobResponse !: Array<PostJobStep3>
  applyPostJobScreening: boolean = false
  data:any;
  

  constructor(private _service: RecruiterService, @Inject(TuiDialogService) private readonly dialogs: TuiDialogService, private router: Router) { }

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content).subscribe();
  }

  showModel(content: PolymorpheusContent<TuiDialogContext>, index: number): void {
    this.currentQuestionIndex = index
    console.log(this.currentQuestionIndex,'chkquestion-------');
    
    this.dialogs.open(content).subscribe();
  }


  ngOnInit() {


    this._service.screeningQuestion().subscribe((response: ScreenQuestionResponse) => {
      this.screenQuestion = response.data as Array<ScreenQuestion>
      console.log(this.screenQuestion)
    })


    const storedData = sessionStorage.getItem('postJobStep3');
    if (storedData) {
      this.applyPostJobScreening = true
      const parsedData = JSON.parse(storedData);
      console.log(parsedData,'parsedData------');
      

      // this.questionnaire = parsedData;
      // console.log(this.questionnaire,'----');
      if (Array.isArray(parsedData)) {
        this.postJobResponse = parsedData;
        console.log(parsedData,'questinore-----');
        if (this.questionnaire.length > 0) {
          console.log(this.questionnaire[0].enterQuestion, 'First Question');
          console.log(this.questionnaire[0].type, 'First Type');
          console.log(this.questionnaire[0].isMandate, 'First isMandate');
        }
        // Populate other relevant fields similarly
      }
      

    }

  }

  ngDoCheck(): void {
    const id = sessionStorage.getItem('postjobStep-2_id')
    this.primaryresponsebility = id
  }

  postJobStep3 = {
    "primary_responsibility_detail_id": "",
    "questionnaire": [{
      "master_question_id": '',
      "question": "",
      "is_mandate": "",
      "type": "",
      "options": [] as string[]
    }]
  }

  options: string[] = ["radio", "numeric", 'text'];
  childOptions: string[] = ["Yes", "No", "May be"]
  selectedValue: any;
  // popupSelectArray: any = []
  popUpSelect(event: any) {
    this.selectedValue = event.target.value
    console.log(this.selectedValue);

    if (this.selectedValue == 'radio') {
      // this.selectedValue = [...this.childOptions];
      console.log(this.selectedValue);
      this.postJobStep3.questionnaire[0].type = this.selectedValue
      this.postJobStep3.questionnaire[0].options = this.childOptions

    } else {
      console.log('numeric', this.selectedValue)
      this.postJobStep3.questionnaire[0].type = this.selectedValue
    }

  }

  popSubmit(): void {
    this.addQuestion()
    console.log('showenterquestion------', this.enterQuestion)

  }

  mandatoryChk() {
    if (this.isChecked) {
      console.log('Checkbox is checked - set value to 1', this.chk = '1');
      this.chk = '1'
    } else {

      this.chk = '0'
      console.log('Checkbox is unchecked - set value to 0', this.chk);
    }
    // this.postJobStep3.questionnaire[0].is_mandate = this.chk
    console.log(this.chk);

  }

  questionnaire: Question[] = [];
  addQuestion() {
    if (this.isChecked) {
      this.chk = '1';
      console.log('Checkbox is checked - set value to 1', this.chk);
    } else {
      this.chk = '0';
      console.log('Checkbox is unchecked - set value to 0', this.chk);
    }
    let enteredQuestion = this.screenQuestion[this.currentQuestionIndex]?.question as string;
    let type = this.screenQuestion[this.currentQuestionIndex].type as string
    // const enterQuestion = this.isChecked ? enteredQuestion : this.enterQuestion;
    
    const newQuestion: Question = {
      // enterQuestion: this.enterQuestion,
      enterQuestion: this.enterQuestion ? this.enterQuestion : enteredQuestion || '',

      // type: this.selectedValue === 'radio' ? this.selectedValue : this.selectedValue,
      type: (this.screenQuestion[this.currentQuestionIndex]?.type as string) || this.selectedValue || 'defaultTypeValue',

      // options: this.selectedValue === 'radio' ? this.childOptions : [],
      options: ((this.screenQuestion[this.currentQuestionIndex]?.type as string) === 'radio') ? (this.childOptions || []) : [],

      isMandate: this.chk,

    };
    this.questionnaire.push(newQuestion);
    // this.screenQuestion.push(newQuestion)
    console.log(this.questionnaire)
  }
  backBttn() {  
    this.router.navigate(['recruiter-postjob2'])
  }



  checkedQuestions: { question: string, type: string }[] = [];
  handleCheckboxChange(item: any) {
    console.log(item.id);
    if (item.id) {
      // Assuming 'type' is a property representing the type of the question
      this.checkedQuestions.push({ question: item.question, type: item.type });
      console.log('store', this.checkedQuestions);

    } else {
      const index = this.checkedQuestions.findIndex(q => q.question === item.question);
      if (index !== -1) {
        this.checkedQuestions.splice(index, 1);
      }
    }

    console.log('Checked questions:', this.checkedQuestions);
  }

  previewPost(){

    this.router.navigate(['recruiter-previewpost']) 
}

backbtn(){
  this.router.navigate(['recruiter-postjob2'])
}



  postButton() {
    this.checkedQuestions.forEach((checkedQuestion) => {
      const newQuestion = {
        enterQuestion: checkedQuestion.question,
        type: this.selectedValue === 'radio' ? this.selectedValue : this.selectedValue,
        isMandate: this.chk,
        options: this.selectedValue == 'radio' ? this.childOptions : [],
      };

      this.questionnaire.push(newQuestion);
    });
    const questionsPayload = this.questionnaire.map((question) => {
      return {
        master_question_id: '', // Modify this based on your structure
        question: question.enterQuestion,
        is_mandate: question.isMandate,
        type: question.type,
        options: question.options
        // Other properties as needed
      };
    });
    let payload = {
      primary_responsibility_detail_id: this.primaryresponsebility,
      questionnaire: questionsPayload,
      // Array of questions mapped from this.questionnaire
    };
    console.log(payload,'payload----');
    
    this._service.postJobStep3(payload).subscribe((response: PostJobStep3Response) => {
      console.log('ap[icall------', response)
      this.screenQuestion = response.data as Array<ScreenQuestion>
      let data = sessionStorage.setItem('postJobStep3',JSON.stringify(response.data))
      this.questionnaire = []
      if (response.status == 200) {
        this._service.NotificationService(response.message,'Update Successfully' , 'success' , 5000)

        this.applyPostJobScreening = true
        this.postJobResponse = response.data as Array<PostJobStep3>
      }
      if(response.status == 201){
        this._service.NotificationService(response.message,'Fill Data' , 'error' , 5000)

      }

    })

    console.log('payload-----', payload);
  }
}


