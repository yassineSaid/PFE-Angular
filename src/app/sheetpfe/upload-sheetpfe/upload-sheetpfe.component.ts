import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SheetService} from '../sheet.service';

@Component({
  selector: 'app-upload-sheetpfe',
  templateUrl: './upload-sheetpfe.component.html',
  styleUrls: ['./upload-sheetpfe.component.scss']
})
export class UploadSheetpfeComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  disabled: Boolean = true;
  fileToUpload: File = null;
  files: any[] = [];
  constructor(public modal: NgbActiveModal, private sheetService: SheetService) { }

  ngOnInit() {
  }
  handleFileInput(files: FileList) {
    if (files.length > 0) {
      this.disabled = false;
      this.fileToUpload = files.item(0);
    } else {
      this.disabled = true;
    }
  }

  uploadFileToActivity() {
    this.disabled = true;
    this.sheetService.postFile(this.fileToUpload).subscribe(success => {
      if (success) {
        this.modal.close();
        this.passEntry.emit();
      }
    }, error => {
      console.log(error);
    });
  }
}
