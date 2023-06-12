import { ContactService } from 'src/app/services/contacts/contact.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css'],
})
export class AdminContactComponent {
  contacts: any[] = [];
  contact: any;

  p: number = 1;

  constructor(private contactService: ContactService) {
    this.contactService.getAll().subscribe((data) => {
      this.contacts = data.data;
    });
  }

  show(id: string) {
    this.contactService.getOne(id).subscribe((data) => {
      this.contact = data.data;
    });
  }
}
