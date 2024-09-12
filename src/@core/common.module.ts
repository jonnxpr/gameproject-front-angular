import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreDirectivesModule } from "./directives/directives.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreDirectivesModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
  ]
})

export class CoreCommonModule { }
