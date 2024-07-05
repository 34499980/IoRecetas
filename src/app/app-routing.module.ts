import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { RecetaComponent } from './receta/receta';

const routes: Routes = [
  {
    path: ``,     
    component: HomePage,
    
},
{
  path: `receta`,     
  component: RecetaComponent,
  
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
