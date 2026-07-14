import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { actionKey, isActionLoading } from '../../shared/utils/action-loading.util';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import { SharedService } from '../../shared/services/shared.service';
import { FileUploadService } from '../../shared/components/file-upload/file-upload.service';
import { DeleteConfirmationComponent } from '../../shared/components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrl: './file-manager.component.scss'
})
export class FileManagerComponent implements OnInit {
  currentFolder: string = 'Admin';
  totalUserFiles: number = 0;

  filesList: any[] = [];
  foldersList: any[] = [];

  hasEverLoaded = false;
  isListLoading = false;
  btnLoading: string | number | null = null;
  isBtnLoading = (action: string, id?: string | number | null) => isActionLoading(this.btnLoading, action, id);

  constructor(private modalservice: NgbModal, private fileuploadservice: FileUploadService, public sharedservice: SharedService) {}

  ngOnInit(): void {
    this.getFilesByFolder();
    this.getFoldersByPath();
  }

  getFilesByFolder() {
    if (this.isListLoading) return;
    this.isListLoading = true;

    this.fileuploadservice.getFilesByPath({ path: this.currentFolder + '/' }).pipe(
      finalize(() => this.isListLoading = false)
    ).subscribe({
      next: (res: any) => {
        if (res && res.data) {
          this.filesList = res.data;
          this.totalUserFiles = res.totalCount;
        } else {
          this.filesList = [];
          this.totalUserFiles = 0;
        }
        this.hasEverLoaded = true;
      },
      error: () => {
        this.filesList = [];
        this.totalUserFiles = 0;
        this.hasEverLoaded = true;
      }
    });
  }

  getFoldersByPath() {
    this.fileuploadservice.getFoldersByPath({ path: this.currentFolder + '/' }).subscribe((res: any) => {
      if (res) {
        this.foldersList = res.folders;
      }
    });
  }

  checkCurrentFolderIsHome() {
    if (this.currentFolder == 'Admin') {
      return true;
    } else {
      return false;
    }
    return false;
  }

  UploadFile() {
    const modalRef = this.modalservice.open(FileUploadComponent, {
      size: 'lg',
      backdrop: 'static',
      centered: true
    });
    modalRef.componentInstance.directory = this.currentFolder + '/';
    modalRef.result.then(result => {
      if (result) {
        this.getFilesByFolder();
      }
    });
  }

  deleteData(id: number) {
    const modalRef = this.modalservice.open(DeleteConfirmationComponent, {
      size: 'md',
      centered: true
    });
    modalRef.result.then(result => {
      if (result) {
        if (id) {
          this.btnLoading = actionKey('delete', id);
          this.fileuploadservice.deleteFile(id).pipe(
            finalize(() => this.btnLoading = null)
          ).subscribe({
            next: () => {
              this.sharedservice.showAlert(1, 'Deleted Successfully');
              this.getFilesByFolder();
            },
            error: () => {
              this.sharedservice.showAlert(2, 'Something Went Wrong');
            }
          });
        } else {
          this.sharedservice.showAlert(2, 'Delete Target Not Available');
        }
      }
    });
  }

  openFolder(name) {
    this.currentFolder = `${this.currentFolder}/${name}`;
    this.foldersList = [];
    this.filesList = [];
    this.getFoldersByPath();
    this.getFilesByFolder();
  }

  backFolder() {
    let openedFolders = this.currentFolder.split('Admin/')[1].split('/');
    let backFolderPath = this.currentFolder.replace(`/${openedFolders[openedFolders.length - 1]}`, '');
    this.currentFolder = backFolderPath;
    this.foldersList = [];
    this.filesList = [];
    this.getFoldersByPath();
    this.getFilesByFolder();
  }
}
