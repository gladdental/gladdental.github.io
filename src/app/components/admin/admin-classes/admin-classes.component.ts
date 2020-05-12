import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminClassService } from 'src/app/services/admin-class.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-classes',
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.scss']
})
export class AdminClassesComponent implements OnInit {

  subscription: Subscription;
  classes: any[];
  isAdmin = false;
  currentuser = '';
  haveClass = false;

  constructor(
    public classService: AdminClassService
  ) { }

  ngOnInit() {
    this.loadClasses();
    this.currentuser = localStorage.getItem('username');
    if (localStorage.getItem('username') === 'admin') {
      this.isAdmin = true;
    }
  }

  loadClasses() {
    this.subscription = this.classService.getAllClasses().subscribe( data => {
      this.classes = data;
      if (this.classes.length > 0) {
        this.haveClass = true;
      }
      console.log(data);
    });
  }

  enterScore(id, score) {
    // alert(id+"    "+score)
    this.classService.enterScore(id, score).subscribe( data => {
      Swal.fire({
        position: 'top',
        type: 'success',
        title: 'The score has been changed successfully!',
        showConfirmButton: false,
        timer: 1000
      });
    }, error => {
      console.log(error);
    });
  }

}
