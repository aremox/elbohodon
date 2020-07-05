import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdToStringPipe } from './id-to-string.pipe';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { DomSanitizer } from '@angular/platform-browser';



@NgModule({
  declarations: [IdToStringPipe, DomSanitizerPipe],
  exports: [
    IdToStringPipe,
    DomSanitizerPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
