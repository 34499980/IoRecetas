import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, IonIcon } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Subject } from 'rxjs';
import { Item } from '../models/item.model';
import { Ingrediente, Receta } from '../models/receta.model';
import { RecetasService } from '../services/recetas.service';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-receta',
  templateUrl: 'receta.html',
  styleUrls: ['receta.scss'],
  standalone: true,
  imports: [MatListModule,
    NgFor,
     NgIf,     
     MatButtonModule,
      MatTableModule,
       MatIconModule,
        MatDialogModule,
        IonicModule,
        MatButtonModule,
        MatFormFieldModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule
        ],
})
export class RecetaComponent implements OnInit { 
  recetaService = inject(RecetasService); 
  activatedRoute = inject(ActivatedRoute);
  formBuild = inject(FormBuilder);
  dataTable$: Subject<Receta[]> = new Subject();
  list: Receta[] = [];
  dataSource = new MatTableDataSource<Receta>();
  displayedColumns: string[] = ['name', 'actions'];
  nameList: Item[] = [];
  title: string = '';
  ingrediente: Ingrediente;
  ingredientes: Array<Ingrediente> = new Array<Ingrediente>();
  formGroup = new FormBuilder().group({   
    name: ['', Validators.required],
    count: ['', Validators.required]
   });

  ngOnInit(): void {
    
  this.title = this.activatedRoute.snapshot.paramMap.get('title') as string;
 
  }
  addItem(){
    if(this.formGroup.valid){
    const input: Ingrediente = {
      nombre: this.formGroup.controls.name.value  as string,
      cant: this.formGroup.controls.count.value  as string
    }
    this.ingredientes.push(input)
    this.formGroup.reset();
  }
  }
  delete(row: Item){

  }
  edit(row: Item){

  }
  removeItem(i: number){
    this.ingredientes.splice(i,1);  
  }
}
