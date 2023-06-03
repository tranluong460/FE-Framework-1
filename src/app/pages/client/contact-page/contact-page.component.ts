import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ContactService } from 'src/app/services/contacts/contact.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
})
export class ContactPageComponent {
  errorMessage: any;

  contactForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    address: [''],
    content: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) {}

  onSubmit() {
    const contact: any = {
      name: this.contactForm.value.name || '',
      email: this.contactForm.value.email || '',
      phone: this.contactForm.value.phone || '',
      address: this.contactForm.value.address || '',
      content: this.contactForm.value.content || '',
    };

    this.contactService.createContact(contact).subscribe(
      (response) => {
        this.errorMessage = 'Phản hồi thành công!';
      },
      (error) => {
        if (Array.isArray(error.error.message)) {
          this.errorMessage = error.error.message[0];
        } else {
          this.errorMessage = error.error.message;
        }
      }
    );

    console.log(contact);
  }
}
