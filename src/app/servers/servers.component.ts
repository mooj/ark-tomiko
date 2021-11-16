import { Component, OnDestroy, OnInit, ViewChild  } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

export interface ServerDetails {
  id: number;
  name: string;
  ipport: string;
}

const TOMIKO_SERVERS = [
  {
    id: 1,
    name: 'Ragnarok',
    ipport: '176.57.181.42:28215'
  },
  {
    id: 2,
    name: 'The Island',
    ipport: '176.57.134.40:28915'
  },
  {
    id: 3,
    name: 'Genesis 1',
    ipport: '176.57.181.148:29415'
  },
  {
    id: 4,
    name: 'Genesis 2',
    ipport: '176.57.173.60:30915'
  },
  {
    id: 5,
    name: 'Crystal',
    ipport: '176.57.181.163:29115'
  },
  {
    id: 6,
    name: 'Aberration',
    ipport: '176.57.174.211:30315'
  },   
  {
    id: 7,  
    name: 'Extinction',
    ipport: '176.57.171.146:30315'
  },   
];


@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit, OnDestroy {
  servers: ServerDetails[] = TOMIKO_SERVERS;
  displayedColumns: string[] = ['name', 'ipport', 'action'];
  storageKey = 'tomiko-servers';
  
  @ViewChild(MatTable,{static:true}) table: MatTable<any> | undefined;

  constructor(public dialog: MatDialog) {}
  
  ngOnDestroy(): void {
   this.saveToLocal();
  }

  ngOnInit(): void {
    const serversLocal = localStorage.getItem(this.storageKey);
    if (serversLocal) {
      this.servers = JSON.parse(serversLocal);
    }
  }

  saveToLocal(){
    localStorage.setItem(this.storageKey, JSON.stringify(this.servers));
  }

  openDialog(action: string,obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '400px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: ServerDetails){
    const date = new Date();
    this.servers.push({
        id: date.getTime(),
        name:row_obj.name,
        ipport: row_obj.ipport
    });
    this.saveToLocal();
    if (this.table){
      this.table.renderRows();
    }
    
  }
  updateRowData(row_obj: ServerDetails){
    this.servers = this.servers.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
        value.ipport = row_obj.ipport;
      }
      return true;
    });
    this.saveToLocal();
  }
  deleteRowData(row_obj: ServerDetails){
    this.servers = this.servers.filter((value,key)=>{
      return value.id != row_obj.id;
    });
    this.saveToLocal();
  }

  loadDefaults() {
    this.servers = TOMIKO_SERVERS;
    this.saveToLocal();
  }
}
