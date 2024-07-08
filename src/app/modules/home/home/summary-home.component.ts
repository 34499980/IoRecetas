import {Component, inject} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { CommonModule, CurrencyPipe, DatePipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap } from 'rxjs';
import { DataSourceService } from '../../../services/dataSource.service';
import { MovementService } from '../../../services/movement.service';
import { DueService } from '../../../services/due.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogMovement } from 'src/app/dialogs/dialog-movement/dialog-movement';
import { Types } from 'src/app/enums/type.enums';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Item } from 'src/app/models/item.model';
import { Movement, SummaryHome, Due } from 'src/app/models/models';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { DialogConfirm } from 'src/app/dialogs/confirm/dialog-confirm';
@Component({
  selector: 'summary-home',
  styleUrls: ['summary-home.component.scss'],
  templateUrl: 'summary-home.component.html',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [    
    CurrencyPipe,
    DatePipe,
    NgStyle,
     MatDialogModule,
     MatTableModule,
      MatButtonModule,
       MatIconModule,
       NgIf, NgFor,
       IonicModule
  ]
})
export default class SummaryHomeComponent {
  movementService = inject(MovementService);
  dataSourceService = inject(DataSourceService);
  dueService = inject(DueService);
  route = inject(ActivatedRoute);
  public dialogService = inject(MatDialog);

  dataTable$: Subject<Movement[]> = new Subject();
  date = new Date();
  newItem!: SummaryHome;
  newDue!: Due;
  list: SummaryHome[] = [];
  listCategories: Item[] = [];
  listTypes: Item[] = [];
  images: Item[] = [];
  dataSource = new MatTableDataSource<SummaryHome>();
  columnsToDisplay: string[] = ['Categoria', 'Monto', 'Tipo'];
  expandedElement!: SummaryHome | null;
  salary: number = 0;
  buys: number = 0;
  rest: number = 0;

  ngOnInit(): void {
    this.listCategories = this.route.snapshot.data['categories'];
    this.listTypes = this.route.snapshot.data['types'];
    
    this.getMovements();
    this.loadData(); 
    
  }
 
  restValidation(){
   return this.salary - this.buys < 1? true: false;
  }
  getMovements(){
    this.dataTable$.pipe(
      switchMap(() =>{ 
        const month = (this.date.getMonth()+1).toString();
        const year =  this.date.getFullYear().toString();
        return  this.movementService.getByMonth(month, year)
      })
    ).subscribe(res  =>  {
     
      let category = '';
      let index = 0;
      const end = res.length;
      while(index < end){
        let movementList: Movement[] = [];
        if(category != res[index].categoryKey){
          this.newItem = this.createNewItem(res[index], category)
          category = res[index].categoryKey;
        }
        while(index < end && category == res[index].categoryKey){
          this.newItem.Monto += res[index].amount;
          movementList.push(res[index])
          if(Types.INPUT == res[index].typeKey){
            this.salary += res[index].amount;
          } else {
            this.buys += res[index].amount;
          }
          index++;
        }       
        movementList =  movementList.sort((a, b) => new Date(b.createdDate).getDate() - new Date(a.createdDate).getDate());

        this.newItem.movement = movementList;
        this.list.push(this.newItem);
      }    
      const listResp = this.list.sort((a,b) => b.Tipo.localeCompare(a.Tipo));
      this.dataSource.data = listResp;
    })
  }
  createDue(amount: number, due: number): Due{
    const newDue: Due = {
      totalAmount: amount,
      countDues: due.toString()
      }
      return newDue;
  }
  createNewItem(element: Movement, category: string):SummaryHome{
    category = element.categoryKey;
  const newItem : SummaryHome = {
      Categoria: this.listCategories.find(x => x.key == element.categoryKey)?.description as string,
      Monto: 0,
      Tipo: this.listTypes.find(x => x.key == element.typeKey)?.description as string
    };
    return newItem;
  }
  loadData(){
    this.buys = 0;
    this.salary = 0;
    this.newDue = {} as any ; 
    this.newItem = {} as any ;   
    this.list = [];
    this.dataSource.data = [];
    this.dataTable$.next([]);
  }
  add(){
    const dialogRef = this.dialogService.open(DialogMovement, {
      data: {list: this.listCategories,
             title: "Ingresar movimiento",
            listType : this.listTypes},
      
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result){
      const date = new Date();     
      if(result.due > 0){
        this.newDue = this.createDue(result.amount, result.due);
      }
      const input: Movement = {
        amount: result.amount,
        categoryKey: result.category,
        createdDate: '',
        createdBy: 'system',
        description: result.description,
        dueBool: result.due > 0? true: false,
        dueKey: '',
        key: '',
        modifiedDate: '',
        typeKey: result.type,
        due: result.due > 0? this.newDue: undefined,
        month: date.getMonth()+1,
        year: date.getFullYear()


      }
      this.movementService.add(input).subscribe({
        next: res => {
          this.loadData()
        } 
      })
     }
    });
  }
  delete(key: string){
    const dialogRef = this.dialogService.open(DialogConfirm, {
      data: {name: '', object: "el movimiento"},
      
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result){
      this.movementService.delete(key).subscribe({
        next: res => {
          this.loadData()
        } 
      }) 
     }
    });
 
  }
}
