import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  sidebarPages :any[] = [];
  constructor(
    public sharedservice : SharedService,
    public router : Router,
  ) { }
  ngOnInit(): void {
    let sidebarEncoded = localStorage.getItem('admin_pages');
    if(sidebarEncoded){
      let decodedJSON = atob(sidebarEncoded);
      if(decodedJSON){
        let parsedJSON = JSON.parse(String(decodedJSON));
        this.sharedservice.sidebarPages = parsedJSON;
        console.log('this.sharedservice.sidebarPages-->',this.sharedservice.sidebarPages);
        
      }else{
        this.logout();
      }
    }
  }

  logout(){
    localStorage.removeItem('admin_data');
    localStorage.removeItem('admin_pages');
    localStorage.clear();
    this.router.navigate(['/'])
  }

}
