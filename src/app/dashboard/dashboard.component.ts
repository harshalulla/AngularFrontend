import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Policy } from '../policy'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedPolicy: Policy = { id: null, policynumber: null, amount: null };
  policies: Policy[];
  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.apiService.readPolicies().subscribe((policies: Policy[]) => {
      this.policies = policies;
      console.log(this.policies);
    })

  }
  createOrUpdatePolicy(form) {
    if (this.selectedPolicy && this.selectedPolicy.id) {
      form.value.id = this.selectedPolicy.id;
      this.apiService.updatePolicy(form.value).subscribe((policy: Policy) => {
        console.log("Policy updated", policy);
        alert('Policy updated!!');
        this.reloadPage();
      });
    }
    else {
      console.log(form.value);
      this.apiService.createPolicy(form.value).subscribe((policy: Policy) => {
        console.log("Policy created, ", policy);
        alert('Policy created!!');
        this.reloadPage();
      });
    }

  }


  selectPolicy(policy: Policy) {
    this.selectedPolicy = policy;
  }


  deletePolicy(id) {
    console.log("Policy ID---> ", id);
    this.apiService.deletePolicy(id).subscribe((policy: Policy) => {
      console.log("Policy deleted, ", policy);
      alert('Policy deleted!!')
      this.reloadPage();
    });
   
  }

  reloadPage() {
    window.location.reload();
 }



}
