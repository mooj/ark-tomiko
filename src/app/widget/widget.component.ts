import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface Player {
  Frags: number,
  Id: number,
  Name: string,
  Time: number
  TimeF: string;
}


interface ServerResponse {
  info : {Map: string};
  players: Player[]
}

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input() ipport: string = '';
  private interval: any;
  // private queryUrl = environment.api_url;
  private queryUrl = 'api/query/';

  players: any;
  serverInfo: any;
  displayedColumns: string[] = [ 'Name', 'TimeF'];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      this.interval = setInterval(() =>{
          this.http.get<ServerResponse>(`${this.queryUrl}${this.ipport}`).subscribe(res => {
            this.players = res.players;
            this.serverInfo = res.info;
          });
      }, 10000);
  }

}
