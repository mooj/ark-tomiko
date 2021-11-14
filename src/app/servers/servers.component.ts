import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {
  servers = [
    {
      name: 'Ragna',
      ipport: '176.57.181.42:28215'
    },
    {
      name: 'Island',
      ipport: '176.57.134.40:28915'
    },
    {
      name: 'Gen1',
      ipport: '176.57.181.148:29415'
    },
    {
      name: 'Gen2',
      ipport: '176.57.173.60:30915'
    },
    {
      name: 'Crystal',
      ipport: '176.57.181.163:29115'
    },
    {
      name: 'Aber',
      ipport: '176.57.174.211:30315'
    },   
    {
      name: 'Ext',
      ipport: '176.57.171.146:30315'
    },   
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
