import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public loginForm: any;
  public listdata:any;
  public fetchdetails:any
  public isinsert:boolean =true;
  updateId:number = 0;

  constructor(private builder:FormBuilder,private rest:RestService){}
  ngOnInit(): void {
      this.loginForm=this.builder.group(
        {
          name:['',[Validators.required]],
          salary:['',[Validators.required]]
        }
      )
      this.fetchEmployee();
  }

  fetchEmployee(){
    this.rest.getData().subscribe((res:any)=>{
      console.log("res : ",res)
        this.listdata = res
    })
  }

  saveUser(){
    console.log("this.loginForm : ",this.loginForm.value);

    this.rest.addData({'title':this.loginForm.value.name,'body':this.loginForm.value.name,'user':"1"}).subscribe((res:any)=>{
      alert("inserted successfully")
    })
  }
  action(id:any){
    this.rest.getDetails(id).subscribe((res:any)=>{
      this.fetchdetails = res;
      window.scrollTo(0, 0);
      this.updateId = this.fetchdetails.id
      this.loginForm.get('name').setValue(this.fetchdetails.title);
      this.loginForm.get('salary').setValue(this.fetchdetails.body);
      this.isinsert =false;
    })

  }

  update (){
    this.rest.updateData(this.updateId,{'title':this.loginForm.value.name,'body':this.loginForm.value.salary}).subscribe((res:any)=>{
      alert("Updated Successfully");
      this.isinsert= true;
      this.fetchdetails();
    })
  }

  

  deleted(id:any){
    this.rest.deleted_data(id).subscribe((res:any)=>{
      alert("deleted successfully")
      this.fetchEmployee();
    })
    
  }
}
