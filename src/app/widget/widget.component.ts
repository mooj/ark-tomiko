import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Player {
  Frags: number,
  Id: number,
  Name: string,
  Time: number
  TimeF: string;
}


interface ServerResponse {
  info: { Map: string, MaxPlayers: number, Players: number };
  players: Player[],
  rules: { DayTime_s: string }
}

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit, OnDestroy {
  @Input() ipport: string = '';
  @Input() name: string = '';
  private interval: any;
  private queryUrl = 'api/query/';

  players: any;
  serverInfo: any;
  serverDay: string = '0';
  somethingWentWrong = false;
  displayedColumns: string[] = ['Name', 'TimeF'];
  constructor(private http: HttpClient) { }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  ngOnInit(): void {
    this.loadPlayers();
    this.interval = setInterval(() => {
      this.loadPlayers();
    }, 10000);
  }

  loadPlayers() {
    this.http.get<ServerResponse>(`${this.queryUrl}${this.ipport}`).subscribe(res => {
      if (res && res.info) {
        this.players = res.players;
        this.serverInfo = res.info;
        this.serverDay = res.rules?.DayTime_s || '0';
        this.somethingWentWrong = false;
      } else {
        this.somethingWentWrong = true;
      }
    }, () => this.somethingWentWrong = true); // on error but it gives 200 anyway
  }

}
