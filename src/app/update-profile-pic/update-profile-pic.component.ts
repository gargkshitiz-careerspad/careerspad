import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { ApiService } from '@app/services/api.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '@app/services/authentication.service';


@Component({
  selector: 'app-update-profile-pic',
  templateUrl: './update-profile-pic.component.html',
  styleUrls: ['./update-profile-pic.component.scss']
})
export class UpdateProfilePicComponent implements OnInit {
  config = [];
  public imagePath;
  imageUrl: any;
  public message: string;
  showImgPreview = false;
 
  fileString: string; 
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  isUpdateProcess = false;
  uploadPicForm: FormGroup
  imgName = "";

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  cropperCord = {}
  userobj = {};
  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(resp => {
      this.userobj = resp;
    });
    this.initUploadPicForm();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    
    if (event.target.files.length > 0) {
      console.log(event.target.files);
      const img = event.target.files[0];
      this.imgName = event.target.files[0].name;
      this.uploadPicForm.get('profilePic').setValue(img);
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.cropperCord = event.cropperPosition;    
    console.log(event);
  }
  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded')
  }
  cropperReady() {
    console.log('Cropper ready')
  }
  loadImageFailed() {
    console.log('Load failed');
  }
  initUploadPicForm() {
    this.uploadPicForm = this.formBuilder.group({
      profilePic: ['']
    });
  }
  uploadPic() {
    debugger;
    const formData = new FormData();
    formData.append('file', this.uploadPicForm.get('profilePic').value, this.imgName);
    formData.append('x1', this.cropperCord['x1']);
    formData.append('y1', this.cropperCord['y1']);
    formData.append('x2', this.cropperCord['x2']);
    formData.append('y2', this.cropperCord['y2']);
    
    this.isUpdateProcess = true;
    this.api.post('/uploadProfilePic.php', formData).subscribe(resp => {
      this.isUpdateProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Updated',
          text: 'Profile Pic Updated Successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((rsp) => {
          this.modalService.dismissAll();
          this.auth.updateProfilePic(resp.pic);
        });
      }
    });
  }

  modalDismiss(reason){
    this.modalService.dismissAll(reason);
  }

}
