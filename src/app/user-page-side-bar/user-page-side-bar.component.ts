import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-user-page-side-bar',
  templateUrl: './user-page-side-bar.component.html',
  styleUrls: ['./user-page-side-bar.component.scss']
})
export class UserPageSideBarComponent implements OnInit {
  userobj: any = {};
  isCouncil = false;
  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(resp => {
      this.userobj = resp;
    });
    this.isMentorCouncil();
  }

  isMentorCouncil(){   
      let params = new HttpParams();
      this.api.get('/isMentorCouncil.php', params).subscribe(resp => {
        this.isCouncil = resp.success;
      });
  
  }


  logout(){
    this.auth.logout(); 
    this.router.navigate(['/login']);   
  }

}
