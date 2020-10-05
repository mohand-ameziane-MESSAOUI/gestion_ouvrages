import {Component, Input, OnInit} from '@angular/core';
import {Ouvrage} from "../ouvrage";
import {OuvrageService} from "../ouvrage.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ouvrages: Ouvrage[] = [];

  ouvrageDisp: number;

  ouvragePre: number;
  private dataSource: MatTableDataSource<Ouvrage>;

  @Input()
  pret: boolean = false;

  @Input()
  disp: boolean = false;

  @Input()
  preter: string = "preter";

  @Input()
  disponible: string = "disponible";

  @Input()
  tous: string = "tous";

  @Input()
  filter: string = "tous";

  constructor(private ouvrageService: OuvrageService) { };

  ngOnInit() {
    this.getOuvrages();
  }

  getOuvrages(): void {
    this.ouvrageService.getOuvrages()
      .subscribe(res => {
        this.ouvrages = res.data;
        this.ouvrageDisp = this.ouvrages.filter(ouvr => {return ouvr.statut == "disponible"}).length;
        this.ouvragePre = this.ouvrages.filter(ouvr => {return ouvr.statut == "preter"}).length;
        this.dataSource = new MatTableDataSource(this.ouvrages)

        })
}



 setList(statut: string):void {
    console.log("statut",statut)
    this.filter = statut
}

}
