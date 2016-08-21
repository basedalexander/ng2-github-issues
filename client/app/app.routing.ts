import { Routes, RouterModule } from '@angular/router';

import { RepositoryComponent } from './github-page/repository/repository.component';

const appRoutes: Routes = [
    { path: 'github-issues', component: RepositoryComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
