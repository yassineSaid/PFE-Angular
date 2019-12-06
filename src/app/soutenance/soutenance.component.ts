import { Component, OnInit, Injectable } from '@angular/core';
import { Soutenance } from './entities/Soutenance';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SoutenanceService } from './services/SoutenanceServices';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-soutenance',
  templateUrl: './soutenance.component.html',
  styleUrls: ['./soutenance.component.scss']
})
@Injectable()
export class SoutenanceComponent implements OnInit {
    Soutenances:Soutenance[];
    Soutenancee:Soutenance;
    valuesJson:any;
    new=true
    form=false
    name:string;
    events: any[];
    options: any;
    public soutenanceform:FormGroup= new FormGroup({
      titre:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
      dateSoutenance:new FormControl(),
      noteSoutenance:new FormControl(),
      salle:new FormControl() 
    })
      constructor(private soutenanceServices:SoutenanceService,private formBuilder:FormBuilder) { }
      
    
      addSoutenance(){
       
        this.Soutenancee=this.soutenanceform.value;
        this.valuesJson=JSON.stringify(this.Soutenancee);
        this.soutenanceServices.addSoutenance(this.valuesJson).subscribe(status=> console.log(JSON.stringify(status)))
      }
      ngOnInit() {
      this.soutenanceServices.getSoutenance().subscribe(data=>this.Soutenances=data)




      this.options = {
        plugins:[ dayGridPlugin, timeGridPlugin, interactionPlugin ],
        defaultDate: '2017-02-01',
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: true
    };



    this.events = [
      {
          "title": "All Day Event",
          "start": "2016-01-01"
      },
      {
          "title": "Long Event",
          "start": "2016-01-07",
          "end": "2016-01-10"
      },
      {
          "title": "Repeating Event",
          "start": "2016-01-09T16:00:00"
      },
      {
          "title": "Repeating Event",
          "start": "2016-01-16T16:00:00"
      },
      {
          "title": "Conference",
          "start": "2016-01-11",
          "end": "2016-01-13"
      }
  ];
     // this.eventService.getEvents().then(events => {this.events = events;});
  }

      }

