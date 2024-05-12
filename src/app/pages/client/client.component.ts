import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { DxFormModule, DxButtonModule, DxToolbarModule, DxTooltipModule } from 'devextreme-angular';
import { SupplierComponent, SupplierModule } from 'src/app/components/utils/supplier/supplier.component';
import { AuthService } from 'src/app/shared/services';
import { ClientService } from 'src/app/shared/services/client.service';
import { Client } from 'src/app/types/Client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  client!: Client;
  constructor(
    private clientService: ClientService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getUser().then(async (user) => {
      debugger
      const id = user.data?.userId;
      if (id) {
        const data = await this.clientService.GetClientByUser(id).toPromise();
        this.client = data;
        console.log(this.client);
        
      }
    });
  }
}

@NgModule({
  declarations: [ClientComponent],
  exports: [ClientComponent],
  imports: [
    CommonModule,
    DxFormModule,
    DxButtonModule,
    DxToolbarModule,
    DxTooltipModule,
    SupplierModule
  ],
})
export class ClientModule {}