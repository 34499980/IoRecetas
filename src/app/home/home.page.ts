import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { IonicModule, IonIcon } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Subject } from 'rxjs';
import { Item } from '../models/item.model';
import { Receta } from '../models/receta.model';
import { RecetasService } from '../services/recetas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [MatListModule,
    NgFor,
     NgIf,     
     MatButtonModule,
      MatTableModule,
       MatIconModule,
        MatDialogModule,
        IonicModule
        ],
})
export class HomePage implements OnInit { 
  recetaService = inject(RecetasService); 
  router = inject(Router);
  dataTable$: Subject<Receta[]> = new Subject();
  list: Receta[] = [];
  dataSource = new MatTableDataSource<Receta>();
  displayedColumns: string[] = ['name', 'actions'];
  nameList: Item[] = [];

  ngOnInit(): void {
   this.recetaService.getAll().subscribe(res => {
    this.list = res;
    res.forEach(element => {
      const item: Item ={
        key : element.key,
        name: element.nombre 
      }
      this.nameList.push(item);
    });
   });
  }
  add(){
    this.router.navigate(['receta', {title: 'Nueva receta'}])
  }
  delete(row: Item){

  }
  edit(row: Item){

  }
}


