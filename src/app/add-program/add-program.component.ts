import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { AuthenticationService } from '@app/services/authentication.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit {
  now:number;
  isPageLoading = true;
  isAddProgramProcess = false;
  submitted = false;
  addProgramForm: FormGroup;
  specArr = [];
  meridian = true;
  minFromDate = undefined;
  minToDate = undefined;
  fromTime = {hour: new Date().getHours(), minute: new Date().getMinutes()};
  toTime = {hour: new Date().getHours(), minute: new Date().getMinutes()};
  showOfflineAddressField = false;
  showOnlineNote = false;
  imgArr = [];
  showHideImages = false;
  selectedImgShow = false;
  selectedImgName = '';
  showImgErr = false;
  previewProgramObj = {};
  userobj = {};
  showProgramPreview = false;
  showDescErr = false;

  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private datePipe: DatePipe
  ) { 
    this.minFromDate = {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()};
   }

  ngOnInit() {
    this.auth.currentUser.subscribe(resp => {
      this.userobj = resp;
    });
    this.loadSpeciality();
  }
  loadSpeciality(){
    let params = new HttpParams();
    this.api.get('/getProgramCatg.php', params).subscribe(resp => {
      this.isPageLoading = false;
      this.specArr = resp;
      this.initChangePasswordForm();
    });
  }
  
  addOtherSkillFormGroup(): FormGroup {  
    return this.formBuilder.group({  
      fromDate: ['', Validators.required],  
      fromTime : [this.toTime, Validators.required],  
      toTime: [this.toTime, Validators.required]  
    });  
  } 
  get f() { return this.addProgramForm.controls; }
  initChangePasswordForm() {
    this.addProgramForm = this.formBuilder.group({
      catg: ['', Validators.required],
      title: ['', Validators.required],
      tagLine: ['', Validators.required],
      description: ['', Validators.required],
      noOfSeats: ['', Validators.required],
      dates: this.formBuilder.array([ this.addOtherSkillFormGroup()]),
      price: [''],
      eventMode: ['', Validators.required],
      city: [''],
      address: [''],
      img: ['']      
    });
    
    this.addProgramForm.get('eventMode').valueChanges.subscribe(checked => {
      if (checked=='Virtual/WebBased') {
        this.showOnlineNote = true;
        this.showOfflineAddressField = false;
        this.addProgramForm.get('city').setValidators(null);
        this.addProgramForm.get('address').setValidators(null);        
      } else {
        this.showOfflineAddressField = true;
        this.showOnlineNote = false;
        this.addProgramForm.get('city').setValidators([Validators.required]);
        this.addProgramForm.get('address').setValidators([Validators.required]);        
      }
      this.addProgramForm.get('city').updateValueAndValidity();
      this.addProgramForm.get('address').updateValueAndValidity();
    });
  }
  addButtonClick(): void {         
    debugger;
    let temp = this.addProgramForm.get('dates').value;
    let count = parseInt(temp.length) - 1;
    this.minFromDate = {year: temp[count]['fromDate'].year, month: temp[count]['fromDate'].month, day: temp[count]['fromDate'].day};
    (<FormArray>this.addProgramForm.get('dates')).push(this.addOtherSkillFormGroup());
  } 
  onSubmit(){
    this.submitted = true;
    this.showImgErr = false;
    if (this.addProgramForm.invalid || this.addProgramForm.get('img').value==''  || this.addProgramForm.get('description').value=='') {
      if(this.addProgramForm.get('img').value==''){
        this.showImgErr = true;
      }
      else{
        this.showImgErr = false;
      }
      if(this.addProgramForm.get('description').value==''){
        this.showDescErr = true;
      }
      else{
        this.showDescErr = false;
      }   
      return;
    }
    debugger;
    let tempDates = this.addProgramForm.get('dates').value;
    let date = new Date(tempDates[0]['fromDate'].year, tempDates[0]['fromDate'].month - 1, tempDates[0]['fromDate'].day);
    var previewFromDate = this.datePipe.transform(date,"MMM d, y");

    let tempFromTimeHour = tempDates[0]['fromTime'].hour;
    let tempFromTimeMin = tempDates[0]['fromTime'].minute;
    let tempFromTimePart = tempFromTimeHour >= 12 ? 'pm' : 'am';
    tempFromTimeMin = (tempFromTimeMin+'').length == 1 ? `0${tempFromTimeMin}` : tempFromTimeMin;
    tempFromTimeHour = tempFromTimeHour > 12 ? tempFromTimeHour - 12 : tempFromTimeHour;
    tempFromTimeHour = (tempFromTimeHour+'').length == 1 ? `0${tempFromTimeHour}` : tempFromTimeHour;

    let tempToTimeHour = tempDates[0]['toTime'].hour;
    let tempToTimeMin = tempDates[0]['toTime'].minute;
    let tempToTimePart = tempToTimeHour >= 12 ? 'pm' : 'am';
    tempToTimeMin = (tempToTimeMin+'').length == 1 ? `0${tempToTimeMin}` : tempToTimeMin;
    tempToTimeHour = tempToTimeHour > 12 ? tempToTimeHour - 12 : tempToTimeHour;
    tempToTimeHour = (tempToTimeHour+'').length == 1 ? `0${tempToTimeHour}` : tempToTimeHour;

    this.previewProgramObj = {
      title: this.addProgramForm.get('title').value,
      img: "media/"+this.selectedImgName,
      tag_line: this.addProgramForm.get('tagLine').value,
      fromDate: previewFromDate,
      fromTime: tempFromTimeHour+':'+tempFromTimeMin+' '+tempFromTimePart,
      toTime: tempToTimeHour+':'+tempToTimeMin+' '+tempToTimePart,
      price: this.addProgramForm.get('price').value!=="" ? this.addProgramForm.get('price').value : "Complimentry",
      address: this.addProgramForm.get('eventMode').value==="Virtual/WebBased" ? "Web Based" : this.addProgramForm.get('city').value,
      uploadByImg: this.userobj['pic'],
      uploadByName: this.userobj['name'],
    }
    this.showProgramPreview = true;
  }
  addProgram(){
    this.isAddProgramProcess = true;    
    this.api.post('/addProgram.php', this.addProgramForm.value).subscribe(resp => {
      this.isAddProgramProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Add Program',
          text: 'Program Added Successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((rsp) => {
          this.router.navigate(['/dashboard']);
        });
      }
    });
  }

  editProgram(){
    this.showProgramPreview = false;
  }
  loadImages(){
    let params = new HttpParams();
    params = new HttpParams().set("category",this.addProgramForm.value.catg);
    this.api.get('/getImageByCategory.php', params).subscribe(resp => {
      this.imgArr = resp;
    });
  }
  showImages(){
    this.showHideImages = true;
    this.selectedImgShow = false;
  }
  selectImage(img){
    this.showHideImages = false;
    this.selectedImgName = img;
    this.addProgramForm.get('img').setValue(img);
    this.showImgErr = false;
    this.selectedImgShow = true;
  }

  minDateForToDate(){
    
  }
}
