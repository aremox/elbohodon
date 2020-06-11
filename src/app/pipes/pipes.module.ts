import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdToStringPipe } from './id-to-string.pipe';



@NgModule({
  declarations: [IdToStringPipe],
  exports: [
    IdToStringPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
