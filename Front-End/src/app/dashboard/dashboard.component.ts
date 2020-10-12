import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Ouvrage} from '../ouvrage';
import {OuvrageService} from '../ouvrage.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from '../modal/modal.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;

  ouvrages: Ouvrage[] = [];
  ouvragesDisponible: number;
  ouvragesPreter: number;
  status = 'all';
  dataSource: MatTableDataSource<Ouvrage>;

  @Input()
  preter = 'Prêté';
  @Input()
  disponible = 'disponible';
  @Input()
  all = 'all';

  auteur = '';
  genre = '';
  statut = '';
  titre = '';

  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  page: number = 1;
  totalOuvrgae: number;

  constructor(private ouvrageService: OuvrageService, public dialog: MatDialog) {
  }

  ngOnInit(): void{
    this.getOuvrages();
  }

  updatePageParameters(event: PageEvent): void{
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }

  updatePage(event: PageEvent): void {
    this.updatePageParameters(event);
    this.ouvrageService.getOuvrages(this.titre, this.auteur, this.genre, this.statut, this.page, this.pageSize)
      .subscribe(res => {
        this.ouvragesDisponible = res.total_disponible;
        this.ouvragesPreter = res.total_preter;
        this.ouvrages = res.data;
        this.length = res.total;
        this.page = res.page;
        this.totalOuvrgae = res.total_ouvrages;
        this.dataSource = new MatTableDataSource(this.ouvrages);
      });
  }

  initDefaultPage(): void{
    this.page = 1;
    this.paginator.pageIndex = 0;
  }


  setList(statut: string): void {
    if (statut === 'all'){
      this.statut = '';
    }else{
      this.statut = statut;
    }
    this.initDefaultPage();
    this.getOuvrages();
  }

  getOuvrages(): void {
    this.ouvrageService.getOuvrages(this.titre, this.auteur, this.genre, this.statut, this.page, this.pageSize)
      .subscribe(res => {
        this.ouvragesDisponible = res.total_disponible;
        this.ouvragesPreter = res.total_preter;
        this.ouvrages = res.data;
        this.length = res.total;
        this.page = res.page;
        this.totalOuvrgae = res.total_ouvrages;
        this.dataSource = new MatTableDataSource(this.ouvrages);
      });
  }

  deleteOuvrage(element: Ouvrage): void {
    this.ouvrageService.deleteOuvrage(element._id)
      .subscribe(res => {
        if (this.ouvrages.length !== 1) {
          this.getOuvrages();
        } else {
          this.ouvrages = [];
          this.ouvragesDisponible = 0;
          this.ouvragesPreter = 0;
          this.dataSource = new MatTableDataSource(this.ouvrages);
        }

      });
  }

  changeStatut(element: Ouvrage): void {
    this.ouvrageService.changeStatut(element)
      .subscribe(res => {
        this.getOuvrages();

      });
  }

  editOuvrage(element: Ouvrage): void {

    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        ouvrage: element,
        type: 'edit'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getOuvrages();
    });

  }

  addOuvrage(): void {
    const dialogRef = this.dialog.open(ModalComponent, {

      data: {
        type: 'add'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getOuvrages();
    });

  }

  detailOuvrage($event: Ouvrage): void {
    this.dialog.open(ModalComponent, {
      data: {
        ouvrage: $event,
        type: 'detail'
      }
    });
  }

  filterFormOuvrage($event: any): void {
    this.initDefaultPage();
    this.ouvrageService.getOuvrages($event.titre, $event.auteur, $event.genre, $event.statut, this.page, this.pageSize )
      .subscribe(res => {
        this.length = res.total;

        if (this.status !== 'all') {
          this.ouvrages = res.data.filter(ouvrage => ouvrage.statut === this.status);
        } else {
          this.ouvrages = res.data;
        }
        this.dataSource = new MatTableDataSource(this.ouvrages);
      });
    this.titre = $event.titre;
    this.auteur = $event.auteur;
    this.genre = $event.genre;
    this.statut = $event.genre;
  }
}
