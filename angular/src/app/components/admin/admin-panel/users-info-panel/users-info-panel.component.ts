import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminUserCrudService } from '../../../../services/admin-user-crud/admin-user-crud.service';
import { Router } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-users-info-panel',
  templateUrl: './users-info-panel.component.html',
  styleUrls: ['./users-info-panel.component.css']
})
export class UsersInfoPanelComponent implements OnInit {

  @Input() users: Array<any>;
  @Input() totalUsers: number;

  @Output() getTotalUsers = new EventEmitter<number>();
  test: any = 'test';


  constructor(
    private adminUserCrudService: AdminUserCrudService,
    private router: Router) { }

  ngOnInit() {
  }

  deleteUser(id: string){
    let self = this;
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function (x) {
        // Remove element from NodeJs.
        self.adminUserCrudService.deleteUser(id).subscribe(data =>{

        // Remove element from DOM.
        var foundUser = self.users.find(x => x._id === id);
        var indexSearch = self.users.indexOf(foundUser);
        console.log(foundUser);
        console.log(self.users.indexOf(foundUser));
        self.users.splice(indexSearch, 1);
        // Reduse counter by to the DOM
        self.totalUsers = self.totalUsers - 1;
        //Reduce counter on fathe component admin-panel
        self.getTotalUsers.emit(self.totalUsers);
        });
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        });
  }

  testFunction(){
    // this.getTotalUsers.emit(7)
  }
  
}
