import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  constructor(private userService : UserService, private messageService : MessageService) {}
  username : string = '';
  // email : string = '';
  password : string = '';
  // firstName : string = '';
  // lastName : string = '';
  // birthdate : string = '';

  onSubmit() {
    this.userService.createUser(this.username, this.password)
      .subscribe(response => this.messageService.add(response.message))
  }
}
