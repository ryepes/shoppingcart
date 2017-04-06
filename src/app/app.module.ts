import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CompraComponent } from './compra/compra.component';
import { CarroComponent } from './carro/carro.component';
import { SumPipe } from './carro/sum.pipe';


const appRoutes: Routes = [
  { path: 'compra', component: CompraComponent },
  { path: 'carro', component: CarroComponent },
  { path: '**', redirectTo: ''}
];


@NgModule({
  declarations: [
    AppComponent,
    CompraComponent,
    CarroComponent,
    SumPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
