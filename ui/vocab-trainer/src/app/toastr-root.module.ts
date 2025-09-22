import { NgModule } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
    imports: [ToastrModule.forRoot()],
    providers: [ToastrService]
})
export class ToastrRootModule {}