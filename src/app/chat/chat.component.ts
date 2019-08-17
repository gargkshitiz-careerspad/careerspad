import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { AuthenticationService } from '@app/services/authentication.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  isPageLoading = true;
  wrapperHeight = 500;
  chatBoxHeight = 500;
  userobj: any = {};
  mmArr: any = [];
  chat: any = [];
  chatWith = '';
  eid = 0;
  @ViewChild('msg') input;
  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.chatWith = this.route.snapshot.params['id'];
        this.loadChat();
      }
    });
  }

  ngOnInit() {
    this.auth.currentUser.subscribe(resp => {
      this.userobj = resp;
    });
    this.chatWith = this.route.snapshot.params['id'];
    this.wrapperHeight = window.innerHeight - 195;
    this.chatBoxHeight =this.wrapperHeight - 30;
    this.loadMentorMentee();
    this.loadChat();
    //this.loadAutoChat();
  }

  loadMentorMentee(){
    let params = new HttpParams();
    this.api.get('/getMentorMentee.php', params).subscribe(resp => {
      this.mmArr = resp;
    });
  }

  //loadAutoChat(){
    //var evtSource = new EventSource("https://www.careerspad.org/api/getChatAuto.php?id="+this.chatWith+"&token="+this.userobj['token']);
    //evtSource.addEventListener('message', message => {
      //this.myData = JSON.parse(message.data);        
      //console.log(message.data);
      //debugger;
      //this.chat = [];
      //this.isPageLoading = false;
      //this.chat = JSON.parse(message.data);
      //this.eid = this.chat['eid'];
    //}, false);
  //}

  loadChat(){
    let params = new HttpParams().set("id", this.route.snapshot.params['id']);    
    this.api.get('/getChat.php', params).subscribe(resp => {
      this.isPageLoading = false;
      this.chat = resp;      
    });
  }

  refreshChat(){
    this.loadChat();
  }

  backPage(){
    this.router.navigate(['/dashboard']);
  }

  sendMsg(){
    debugger;
    let msg = this.input.nativeElement.value;
    if(msg==''){
      return;
    }
    this.api.post('/sentChat.php', {id: this.chatWith, msg: msg}).subscribe(resp => {
      if (resp.success) {
        this.loadChat();
        this.input.nativeElement.value = '';
      }      
    });
  }

}
