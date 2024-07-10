import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MatListModule } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { IonicModule, IonIcon } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Subject, switchMap } from 'rxjs';
import { DialogConfirm } from '../dialogs/confirm/dialog-confirm';
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
        IonicModule,    
          
         
         
            
            MatFormFieldModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            MatInputModule
        ],
})
export class HomePage implements OnInit { 
  recetaService = inject(RecetasService); 
  router = inject(Router);
  formBuild = inject(FormBuilder);
  public dialogService = inject(MatDialog);
  dataTable$: Subject<Receta[]> = new Subject();
  list: Receta[] = [];
  dataSource = new MatTableDataSource<Receta>();
  displayedColumns: string[] = ['name', 'actions'];
 
  formGroup = new FormBuilder().group({   
    search: ['']
   });
  ngOnInit(): void {
    this.formGroup.controls.search.valueChanges.subscribe(val => {
      if(val != '' && val != null && val != undefined){ 
       
        const searList = this.list.filter(x => x.nombre.toLowerCase().includes(val.toLowerCase()))       
        this.dataSource.data = searList;
      } else {
        this.dataSource.data = this.list;
      }
    }
    );
    this.dataTable$.pipe(
       switchMap(() =>{ 
     
      return   this.recetaService.getAll()
    }))
  .subscribe(res => {
    this.list = res as Receta[];
   
      this.dataSource.data = this.list;
    });
   this.loadData();
  }
  ionViewWillEnter(){
    this.loadData();
  }
  add(){
    this.router.navigate(['receta', {title: 'Nueva receta'}])
  }
  loadData(){
    this.dataSource.data = [];
    this.dataTable$.next([]);
  }
  delete(row: Receta){
    const dialogRef = this.dialogService.open(DialogConfirm, {
      data: {name: row.nombre, object: "receta"},
      
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result){
      this.recetaService.delete(row.key).subscribe({
        next: res => {
          this.loadData()
        } 
      })      
     }
    });
  }
  edit(row: Receta){
    this.router.navigate(['receta', {title: row?.nombre, receta: JSON.stringify(row)}])
  }
}


