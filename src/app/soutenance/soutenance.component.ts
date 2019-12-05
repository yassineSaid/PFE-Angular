import { Component, OnInit } from '@angular/core';
import { Soutenance } from './entities/Soutenance';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SoutenanceService } from './services/SoutenanceServices';

@Component({
  selector: 'app-soutenance',
  templateUrl: './soutenance.component.html',
  styleUrls: ['./soutenance.component.scss']
})
export class SoutenanceComponent implements OnInit {
    Soutenances:Soutenance[];
    Soutenancee:Soutenance;
    valuesJson:any;
    new=true
    form=false
    name:string;
    public soutenanceform:FormGroup= new FormGroup({
      name:new FormControl()  })
      constructor(private soutenanceServices:SoutenanceService,private formBuilder:FormBuilder) { }
      
    
      addSoutenance(){
       
        this.Soutenancee=this.soutenanceform.value;
        this.valuesJson=JSON.stringify(this.Soutenancee);
        this.soutenanceServices.addSoutenance(this.valuesJson).subscribe(status=> console.log(JSON.stringify(status)))
      }
    
    
      ngOnInit() {
    
        this.soutenanceServices.getSoutenance().subscribe(data=>this.Soutenances=data)
        this.soutenanceform=this.formBuilder.group({
          name: ['']
         
      })
    
      }
}
