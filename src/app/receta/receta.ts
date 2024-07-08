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
import { ActivatedRoute, Router } from '@angular/router';
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
  router = inject(Router);
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
   description: string;
   receta: Receta;
   flagNew: boolean = false;

  ngOnInit(): void {
    
  this.title = this.activatedRoute.snapshot.paramMap.get('title') as string;  
  const receta = this.activatedRoute.snapshot.paramMap.get('receta') as string;
  if(receta != '' && receta != null){
    this.receta = JSON.parse(receta);
    this.description = this.receta.descripcion;
    this.ingredientes = this.receta.ingredientes;
    this.title = this.receta.nombre;
    this.flagNew = true;
  }

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
  edit(){
    this.receta.descripcion = this.description;
    this.receta.nombre = this.title;
    this.receta.ingredientes = this.ingredientes;
    this.recetaService.edit(this.receta).subscribe(res => {
      this.router.navigate(['home']);
    });

  }
  removeItem(i: number){
    this.ingredientes.splice(i,1);  
  }
  add(){
    if(this.description != '' && this.description != null && this.description != undefined){
       if(!this.flagNew){
        const receta: Receta = {
          descripcion: this.description,
          ingredientes: this.ingredientes,
          key: '',
          nombre: this.title
        }
        this.recetaService.add(receta).subscribe(res =>  this.router.navigate(['home']));
       } else {
        this.edit();
       }
    }
  }
  cancel(){
     this.router.navigate(['home']);
  }
}
