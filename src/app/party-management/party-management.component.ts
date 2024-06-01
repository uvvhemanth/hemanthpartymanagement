
import { Component, OnInit } from '@angular/core';
import { PartyService } from '../service/PartyService';
import { PostPartyService } from '../service/post-party.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-party-management',
  templateUrl: './party-management.component.html',
  styleUrls: ['./party-management.component.css']
})
export class PartyManagementComponent implements OnInit {
  partyData: any;
  type: any;
  description: any;
  key: any;
  value: any;
  items: any; // Define items property here
  adding: boolean = false;
  editingdata: boolean = false;
  deleteingdata: boolean = false;
  parties: any[] = [];
  adddialog: boolean = false;
  editProductForm: boolean = false;
  productForm: boolean = false;
  viwedata:boolean=false;
  editedProduct: any = {};
  result: any;
  dataadd: any;
  constructor(public partyService: PartyService, private ppsc: PostPartyService, private http: HttpClient, private msg: MessageService) { }


  ngOnInit(): void {
    this.getAllParties()
    this.getPartyData()

  }

  getPartyData(): void {
    this.http.get('assets/postman-collection.json').subscribe((data: any) => {
      // Extracting only the "PARTY" data from the JSON response
      const partyGroup = data.item.find((item: any) => item.name === 'PARTY');
      if (partyGroup) {
        // Find the "Post Party" endpoint within the "PARTY" group
        const postPartyEndpoint = partyGroup.item.find((item: any) => item.name === 'Post Party');
        if (postPartyEndpoint) {
          // If the endpoint is found, assign it to partyData
          this.partyData = postPartyEndpoint;
        } else {
          console.error('Post Party endpoint not found');
        }
      } else {
        console.error('PARTY group not found');
      }
    });
  }
  getAllParties() {
    this.ppsc.getAllParties().subscribe(
      data => {
        this.parties = data;
        console.log(this.parties);
      },
      error => {
        console.error('Error fetching all parties:', error);
      }
    );
  }
  opendialog() {
    this.adddialog = true;
  }


  select() { }

  addingdata() {
    this.adding = true;
  }

  removedata(formData: any) {
    this.deleteingdata = true;
    this.editMember(formData)
  }
  editdata(formData: any) {
    this.editingdata = true;
    this.editMember(formData)
  }
  editMember(item: any) {
    if (!item) {
      this.productForm = false;
      return;
    }
    this.editProductForm = true;
    this.editedProduct = (item);
  }
  adddata() {

    let apiname = ''
    var addbatches = {
      "key": this.key,
      "value": this.value,
      "description": this.description,
      "type": this.type,

    }
    this.partyService.adddata(apiname, addbatches).subscribe(
      (res: any) => {
        this.dataadd = res;

      })
  }
  
  update(): void {
    let apiname =''
    const updatedData = {
      "key": this.editedProduct.key,
      "value": this.editedProduct.value,
      "description": this.editedProduct.description,
      "type": this.editedProduct.type,
      'id':5
    };

    this.partyData.item[0].item[2].request.body.formdata.push(updatedData);

    this.partyService.getData(apiname,this.partyData).subscribe(
      res => {
        this.msg.add({ severity: 'success', summary: 'Success', detail: 'JSON data updated successfully' });
      },
      err => {
        this.msg.add({ severity: 'error', summary: 'Error', detail: 'Failed to update JSON data' });
      }
    );


  }

  deletedata() {
    let apiname =''
    const updatedData = {
      
      'id':4
    };

    this.partyData.item[0].item[2].request.body.formdata.push(updatedData);

    this.partyService.delData(apiname,this.partyData).subscribe(
      res => {
        this.msg.add({ severity: 'success', summary: 'Success', detail: 'JSON data Deleted successfully' });
      },
      err => {
        this.msg.add({ severity: 'error', summary: 'Error', detail: 'Failed to update JSON data' });
      }
    );

  }
  close() {
    this.editingdata = false;
    this.adding = false;
    this.deleteingdata = false;
  }
  viwedatdata(){
    this.viwedata=true

  }


}
