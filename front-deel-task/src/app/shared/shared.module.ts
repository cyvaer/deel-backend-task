import { ModuleWithProviders, NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [

  ],
  exports: [
    MaterialModule, FormsModule, ReactiveFormsModule, CommonModule
  ],
  providers: [],
  imports: [ MaterialModule, MatIconModule, FormsModule, ReactiveFormsModule, CommonModule ],
  entryComponents: [

                  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}
