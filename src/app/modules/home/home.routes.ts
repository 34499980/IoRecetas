import { Route } from "@angular/router";
import { CategoriesResolver } from "src/app/resolver/categories.resolver";
import { TypesResolver } from "src/app/resolver/types.resolver";
import SummaryHomeComponent from "./home/summary-home.component";

const homeRoutes: Route[] = [
    {
        path: ``,     
        component: SummaryHomeComponent,
        resolve: {
            types: TypesResolver,
            categories: CategoriesResolver
        }      
    }
];
export default homeRoutes;
