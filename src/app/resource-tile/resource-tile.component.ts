import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resource-tile',
  templateUrl: './resource-tile.component.html',
  styleUrls: ['./resource-tile.component.scss']
})
export class ResourceTileComponent implements OnInit {
  @Input() resource: any = {};
  @Input() style: string;
  @Input() dashboard: boolean;
  @Input() isMentee: boolean;
  @Input() preview: boolean;
  @Input() approval: boolean;

  isDeleteProcess = false;
  isApprovedProcess = false;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
  }

  deleteResource(id) {
    this.isDeleteProcess = true;
    this.api.post('/deleteResource.php',{id}).subscribe(resp => {
      this.isDeleteProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Delete Resource',
          text: 'Resource deleted successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          
        });
      }
    });
  }

  approvedResource(id) {
    this.isApprovedProcess = true;
    debugger;
    this.api.post('/approvedPRMRequest.php',{id: id, type: 2}).subscribe(resp => {
      this.isApprovedProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Approved Resource',
          text: 'Resource approved successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {
          
        });
      }
    });
  }

}
