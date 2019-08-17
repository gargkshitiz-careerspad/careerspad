import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import Swal from 'sweetalert2';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-program-tile',
  templateUrl: './program-tile.component.html',
  styleUrls: ['./program-tile.component.scss']
})
export class ProgramTileComponent implements OnInit {
  @Input() program: any = {};
  @Input() style: string;
  @Input() dashboard: boolean;
  @Input() isMentee: boolean;
  @Input() preview: boolean;
  isDeleteProcess = false;
  @ViewChild('contentToConvert') input;
  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
  }

  deleteProgram(id) {
    this.isDeleteProcess = true;
    this.api.post('/deleteProgram.php', { id }).subscribe(resp => {
      this.isDeleteProcess = false;
      if (resp.success) {
        Swal.fire({
          title: 'Delete Program',
          text: 'Program deleted successfully',
          type: 'success',
          confirmButtonText: 'Done',
        }).then((resp) => {

        });
      }
    });
  }

  downloadCertificate(id) {
    debugger;
    var data = this.input.nativeElement;
    html2canvas(data).then((canvas) => {
      //Initialize JSPDF
      let doc = new jspdf("p", "mm", "a4");
      //Converting canvas to Image
      let imgData = canvas.toDataURL("image/PNG");
      //Add image Canvas to PDF
      doc.addImage(imgData, 'PNG', 20, 20);

      // Make file
      doc.save("example.pdf");

    });
  }
}

