import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { AuthenticationService } from '@app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbarCollapse') input;
  params: HttpParams = new HttpParams();
  specArr = [];
  userobj: any = {};
  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(resp => {
      this.userobj = resp;
    });
    this.loadSpeciality();
  }
  loadSpeciality() {
    this.api.get('/getSpeciality.php', this.params).subscribe(resp => {
      this.specArr = resp;
    });
  }
  closeMenu(){
    this.input.nativeElement.classList.remove("show");
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
