import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ContactService } from 'src/app/services/contacts/contact.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
})
export class ContactPageComponent {
  errorMessage: string = '';

  contactForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
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
        console.log('Response', response);
        this.errorMessage = response.message;

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.log('Error', error);

        this.errorMessage = error.error.message[0];
      }
    );
  }
}
