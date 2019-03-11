import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Soildata} from './soildata';
import { MatTable,MatTableDataSource } from '@angular/material';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  url = 'https://spreadsheets.google.com/feeds/cells/1SJPUMuq55OuMmbpFtzEBulm4EPh1BcmdSL-Scv3draY/1/public/full?alt=json';



  googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&language=english&region=PH',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  });

  options = {
    layers: [
      this.googleStreets
    ],
    zoom: 6,
    center: L.latLng({ lat: 12.196486, lng: 123.28553643124997 }),
    zoomControl: false
  };

  title = 'app';
  did: number;
  dprovince: string ;
  dmunicipality: string;
  dbarangay: string;
  dnitrogen: number;
  dpotassium: number;
  dphosporous: number;
  dlatitude: number;
  dlongitude: number;
  dataSource1 = new MatTableDataSource<Soildata>();

  displayedColumns: string[] = ['province', 'municipality', 'nitrogen','id','longitude','latitude','phosporous'];
  public soildata: Soildata[]=[];

  @ViewChild(MatTable) table: MatTable<any>;
 
  constructor(private http: HttpClient) {


  }


  ngOnInit(): void {
    this.http.get(this.url).subscribe(data => {

      //parse the google sheet
      for (let index = 9; index < data['feed']['entry'].length; index = index + 9) {
        this.soildata.push

        this.did = data['feed']['entry'][index]['content']['$t'];
        this.dprovince = data['feed']['entry'][index + 1]['content']['$t'];
        this.dmunicipality= data['feed']['entry'][index + 2]['content']['$t'];
        this.dbarangay= data['feed']['entry'][index + 3]['content']['$t'];
        this.dnitrogen = data['feed']['entry'][index + 4]['content']['$t'];
        this.dpotassium = data['feed']['entry'][index + 5]['content']['$t'];
        this.dphosporous = data['feed']['entry'][index + 6]['content']['$t'];
        this.dlatitude = data['feed']['entry'][index + 7]['content']['$t'];
        this.dlongitude = data['feed']['entry'][index + 8]['content']['$t'];
  

        this.soildata.push({
          id: this.did,
          province: this.dprovince,
          municipality: this.dmunicipality,
          barangay: this.dbarangay,
          nitrogen: this.dnitrogen,
          potassium: this.dpotassium,
          phosporous: this.dphosporous,
          latitude: this.dlatitude,
          longitude: this.dlongitude

        });
      }


      this.dataSource1 = new MatTableDataSource(this.soildata);
    });

  }


}
