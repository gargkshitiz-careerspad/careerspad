import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from '@app/signin/signin.component';
import { AuthGuard } from '@app/guards/auth.guard';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SpecialityComponent } from './speciality/speciality.component';
import { AboutComponent } from './about/about.component';
import { GetCareerAdviceComponent } from './get-career-advice/get-career-advice.component';
import { MentorsComponent } from './mentors/mentors.component';
import { ResourcesComponent } from './resources/resources.component';
import { ProgramsComponent } from './programs/programs.component';
import { CampusConnectComponent } from './campus-connect/campus-connect.component';
import { SignupComponent } from './signup/signup.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { MentorDetailsComponent } from './mentor-details/mentor-details.component';
import { ProgramDetailsComponent } from './program-details/program-details.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddProgramComponent } from './add-program/add-program.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { CareerAdviceComponent } from './career-advice/career-advice.component';
import { InviteMentorsComponent } from './invite-mentors/invite-mentors.component';
import { MenteesComponent } from './mentees/mentees.component';
import { ApprovalRequestComponent } from './approval-request/approval-request.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProgramBookingListComponent } from './program-booking-list/program-booking-list.component';
import { BecomeAMentorComponent } from './become-a-mentor/become-a-mentor.component';
import { MentorApplicationRequestComponent } from './mentor-application-request/mentor-application-request.component';
import { SpecialityDetailsComponent } from './speciality-details/speciality-details.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }, 
  {
    path: 'get-career-advice',
    component: GetCareerAdviceComponent
  },
  {
    path: 'mentors',
    component: MentorsComponent
  },
  {
    path: 'mentors/:catg',
    component: MentorsComponent
  },
  {
    path: 'mentors/profile/:url',
    component: MentorDetailsComponent
  },
  {
    path: 'resources',
    component: ResourcesComponent
  },
  {
    path: 'resources/:catg',
    component: ResourcesComponent
  },
  {
    path: 'resources/:catg/:url',
    component: ResourceDetailsComponent
  },  
  {
    path: 'programs',
    component: ProgramsComponent
  },
  {
    path: 'programs/:catg',
    component: ProgramsComponent
  },
  {
    path: 'programs/:catg/:url',
    component: ProgramDetailsComponent
  },
  {
    path: 'speciality/:catg',
    component: SpecialityComponent
  },
  {
    path: 'speciality/:catg/:sub_catg',
    component: SpecialityDetailsComponent
  },
  {
    path: 'campus-connect',
    component: CampusConnectComponent
  }, 
  {
    path: 'login',
    component: SigninComponent
  }, 
  {
    path: 'register',
    component: SignupComponent
  },
  {
    path: 'become-a-mentor',
    component: BecomeAMentorComponent
  },
  {
    path: 'mentor-application-request',
    component: MentorApplicationRequestComponent
  },
  {
    path: 'thank-you',
    component: ThankYouComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'set-new-password',
    component: SetNewPasswordComponent
  },
  {
    path: 'terms-of-use',
    component: TermsOfUseComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'disclaimer',
    component: DisclaimerComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'chat/:id',
    component: ChatComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-program',
    component: AddProgramComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-resource',
    component: AddResourceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'invite-mentors',
    component: InviteMentorsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'career-advice',
    component: CareerAdviceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mentees',
    component: MenteesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'approval-request',
    component: ApprovalRequestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'program-booking-list/:id',
    component: ProgramBookingListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent 
  }
];

@NgModule({
  declarations: [
    PageNotFoundComponent,    
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
