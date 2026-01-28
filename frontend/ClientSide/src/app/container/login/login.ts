import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink,Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  loginForm!:FormGroup

  constructor(private fb:FormBuilder,private authservice:AuthService,private router:Router){}

  ngOnInit(): void {

    this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
    })
      
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // Here you would call your AuthService.login(email, password)
      this.authservice.login(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log("res of login",res)
          this.router.navigate(['/dashboard'])

        },
        error:(err)=>{

          console.log("error in login",err)
        }
      })
      console.log("Attempting login for:", email);
    }
  }

}
