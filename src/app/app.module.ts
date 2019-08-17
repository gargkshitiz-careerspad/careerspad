import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DatePipe } from '@angular/common'

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SpecialityTileComponent } from './speciality-tile/speciality-tile.component';
import { SpecialityComponent } from './speciality/speciality.component';
import { ProgramTileComponent } from './program-tile/program-tile.component';
import { ResourceTileComponent } from './resource-tile/resource-tile.component';
import { AboutComponent } from './about/about.component';
import { GetCareerAdviceComponent } from './get-career-advice/get-career-advice.component';
import { MentorsComponent } from './mentors/mentors.component';
import { ResourcesComponent } from './resources/resources.component';
import { ProgramsComponent } from './programs/programs.component';
import { CampusConnectComponent } from './campus-connect/campus-connect.component';
import { SignupComponent } from './signup/signup.component';
import { PageSideBarComponent } from './page-side-bar/page-side-bar.component';
import { MentorTileComponent } from './mentor-tile/mentor-tile.component';
import { UserPageSideBarComponent } from './user-page-side-bar/user-page-side-bar.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { MentorDetailsComponent } from './mentor-details/mentor-details.component';
import { ProgramDetailsComponent } from './program-details/program-details.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { MentoringRequestComponent } from './mentoring-request/mentoring-request.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddProgramComponent } from './add-program/add-program.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { CareerAdviceComponent } from './career-advice/career-advice.component';
import { InviteMentorsComponent } from './invite-mentors/invite-mentors.component';
import { MenteesComponent } from './mentees/mentees.component';
import { ApprovalRequestComponent } from './approval-request/approval-request.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ApiService } from './services/api.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { CareerAdviceTileComponent } from './career-advice-tile/career-advice-tile.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { ProgramBookingListComponent } from './program-booking-list/program-booking-list.component';
import { BecomeAMentorComponent } from './become-a-mentor/become-a-mentor.component';
import { MentorApplicationRequestComponent } from './mentor-application-request/mentor-application-request.component';
import { UpdateProfilePicComponent } from './update-profile-pic/update-profile-pic.component';
import { SpecialityDetailsComponent } from './speciality-details/speciality-details.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import html2canvas from 'html2canvas';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SpecialityTileComponent,
    SpecialityComponent,
    ProgramTileComponent,
    ResourceTileComponent,
    AboutComponent,
    GetCareerAdviceComponent,
    MentorsComponent,
    ResourcesComponent,
    ProgramsComponent,
    CampusConnectComponent,
    SignupComponent,
    PageSideBarComponent,
    MentorTileComponent,
    DashboardComponent,
    UserPageSideBarComponent,
    TermsOfUseComponent,
    PrivacyPolicyComponent,
    ResourceDetailsComponent,
    MentorDetailsComponent,
    ProgramDetailsComponent,
    DisclaimerComponent,
    MentoringRequestComponent,
    UserProfileComponent,
    AddProgramComponent,
    AddResourceComponent,
    CareerAdviceComponent,
    InviteMentorsComponent,
    MenteesComponent,
    ApprovalRequestComponent,
    ChangePasswordComponent,
    SigninComponent,
    CareerAdviceTileComponent,
    ProgramBookingListComponent,
    BecomeAMentorComponent,
    MentorApplicationRequestComponent,
    UpdateProfilePicComponent,
    SpecialityDetailsComponent,
    ThankYouComponent,
    ForgotPasswordComponent,
    SetNewPasswordComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    ImageCropperModule,
    NgbCollapseModule
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
