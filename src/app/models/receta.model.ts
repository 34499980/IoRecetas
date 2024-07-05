export interface Receta{
    nombre: string;
    ingredientes: Ingrediente[]
    descripcion: string;
    key: string;
 }
 export interface Ingrediente{
    nombre: string;
    cant: string;
}