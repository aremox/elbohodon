import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdToStringPipe } from './id-to-string.pipe';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';



@NgModule({
  declarations: [IdToStringPipe, DomSanitizerPipe, ImageSanitizerPipe],
  exports: [
    IdToStringPipe,
    DomSanitizerPipe,
    ImageSanitizerPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
