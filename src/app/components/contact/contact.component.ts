import { Component, OnInit } from '@angular/core';
import { Contact } from "src/app/model/contact.model";
import { Error} from "src/app/model/error.model";
import { NgForm } from '@angular/forms';
import { getCookie } from 'typescript-cookie';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  model = new Contact();
  contacts = new Array();
  errorResp = new Error();

  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit() {
      
  }

  saveMessage(contactForm: NgForm) {
    this.dashboardService.saveMessage(this.model).subscribe(
      responseData => {
        // 10-006 practicing PreFilter annotation: set request as contact array
        this.contacts = <any> responseData.body;

        if (JSON.stringify(<any> responseData.body).includes('errorCode')) {
          this.errorResp = <any> responseData.body;
          alert(this.errorResp.errorMessage);
        } else {
          this.contacts.forEach(function(this: ContactComponent, contact: Contact) {
            debugger;
            this.model = contact;
          }.bind(this));
          contactForm.resetForm();
        }
      });

  }

}
