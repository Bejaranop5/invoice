import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import {
  DxFormModule,
  DxToolbarModule,
  DxTooltipModule,
} from 'devextreme-angular';
import { DxButtonModule, DxButtonTypes } from 'devextreme-angular/ui/button';
import { DxSelectBoxTypes } from 'devextreme-angular/ui/select-box';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { CityService } from 'src/app/shared/services/city.service';
import { CountryService } from 'src/app/shared/services/country.service';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { RegimeService } from 'src/app/shared/services/regime.service';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { City } from 'src/app/types/City';
import { Country } from 'src/app/types/Country';
import { Department } from 'src/app/types/Department';
import { Regime } from 'src/app/types/Regime';
import { Supplier } from 'src/app/types/Supplier';

const ICON_ADD = 'add';
const ICON_SAVE = 'save';
const ICON_CLOSE = 'close';

const TEXT_ADD = 'Agregar Proveedor';
const TEXT_SAVE = 'Guardar';
const TEXT_CANCEL = 'Cancelar';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent implements OnInit {
  constructor(
    private supplierService: SupplierService,
    private countryService: CountryService,
    private departmentService: DepartmentService,
    private cityService: CityService,
    private regimeService: RegimeService
  ) {}

  ngOnInit(): void {
    this.loadMasterSupplier();
    this.loadCountry();
    this.loadRegime();
    this.loadDepartment();
    this.loadCity();
  }

  async onSubmit(e: Event) {}

  @Input() CustomerId!: number;
  supplierReadOnly: boolean = true;
  suppliers: Supplier[] = [];
  masterSuppliers: Supplier[] = [];
  countries: Country[] = [];
  departments: Department[] = [];
  cities: City[] = [];
  regimes: Regime[] = [];

  supplierIdOptions: DxSelectBoxTypes.Properties[] = [];
  countryIdOptions: DxSelectBoxTypes.Properties[] = [];
  departmentIdOptions: DxSelectBoxTypes.Properties[] = [];
  cityIdOptions: DxSelectBoxTypes.Properties[] = [];
  regimeIdOptions: DxSelectBoxTypes.Properties[] = [];
  supplierNitOptions: DxTextBoxTypes.Properties[] = [];
  supplierPhoneOptions: DxTextBoxTypes.Properties[] = [];
  supplierEmailOptions: DxTextBoxTypes.Properties[] = [];
  supplierAddresOptions: DxTextBoxTypes.Properties[] = [];

  newButtonOptions: DxButtonTypes.Properties = {
    icon: ICON_ADD,
    text: TEXT_ADD,
    width: '100%',
    onClick: () => {
      this.addMainSupplier();
    },
  };

  otherButtonOptions: DxButtonTypes.Properties = {
    icon: ICON_ADD,
    text: 'Otro',
    width: '100%',
    onClick: () => {
      this.addMainSupplier();
    },
  };

  saveButtonOptions: DxButtonTypes.Properties = {
    icon: ICON_SAVE,
    useSubmitBehavior: true,
    text: TEXT_SAVE,
    type: 'default',
    width: '100%',
    stylingMode: 'contained',
  };

  cancelButtonOptions: DxButtonTypes.Properties = {
    icon: ICON_CLOSE,
    text: TEXT_CANCEL,
    type: 'danger',
    width: '100%',
    stylingMode: 'contained',
    onClick: () => {
      this.editSupplier();
    },
  };

  private addMainSupplier(): void {
    const newMainSupplier: Supplier = {
      address: '',
      businessName: '',
      cityId: 0,
      countryId: 0,
      departmentId: 0,
      email: '',
      isActive: true,
      nit: '',
      phone: '',
      regimeId: 0,
      supplierId: 0,
      supplierName: '',
    };

    this.suppliers.push(newMainSupplier);

    this.updateOptions();
  }

  private updateOptions() {
    this.supplierPhoneOptions = this.suppliers.map((_, index) =>
      this.generateNewSuppliersPhoneOptions(index)
    );

    this.supplierEmailOptions = this.suppliers.map((_, index) =>
      this.generateNewSuppliersEmailOptions(index)
    );

    this.supplierNitOptions = this.suppliers.map((_, index) =>
      this.generateNewSuppliersNitOptions(index)
    );

    this.supplierIdOptions = this.suppliers.map((_, index) =>
      this.generateNewSupplierIdOptions(index)
    );

    this.countryIdOptions = this.suppliers.map((_, index) =>
      this.generateNewCountryIdOptions(index)
    );

    this.departmentIdOptions = this.suppliers.map((_, index) =>
      this.generateNewDepartmentIdOptions(index)
    );

    this.cityIdOptions = this.suppliers.map((_, index) =>
      this.generateNewCityIdOptions(index)
    );

    this.regimeIdOptions = this.suppliers.map((_, index) =>
      this.generateNewRegimeIdOptions(index)
    );
  }

  private generateNewSupplierIdOptions(
    index: number
  ): DxSelectBoxTypes.Properties {
    const selectedSupplierId = this.suppliers[index]
      ? this.suppliers[index].supplierId
      : null;

    return {
      dataSource: this.masterSuppliers,
      valueExpr: 'supplierId',
      displayExpr: 'supplierName',
      searchEnabled: true,
      placeholder: 'Seleccione Proveedor',
      value: selectedSupplierId,
      buttons: [
        {
          name: 'trash',
          location: 'after',
          options: {
            stylingMode: 'text',
            icon: 'trash',
            onClick: () => {
              const supplierId = this.suppliers[index]
                ? this.suppliers[index].supplierId
                : 0;

              this.suppliers.splice(index, 1);
              if (supplierId > 0) {
                //  this.deleteMainSupplier(supplierId);
              }
              this.updateOptions();
            },
          },
        },
      ],
      onValueChanged: (e) => {
        const selectedSupplier = this.masterSuppliers.find(
          (Supplier) => Supplier.supplierId === e.value
        );

        if (selectedSupplier) {
          this.suppliers[index].supplierId = selectedSupplier.supplierId;
          this.suppliers[index].nit = selectedSupplier?.nit;
          this.updateOptions();
        }
      },
    };
  }

  private generateNewRegimeIdOptions(
    index: number
  ): DxSelectBoxTypes.Properties {
    const selectedRegimeId = this.suppliers[index]
      ? this.suppliers[index].regimeId
      : null;

    return {
      dataSource: this.regimes,
      valueExpr: 'regimeId',
      displayExpr: 'regimeName',
      searchEnabled: true,
      placeholder: 'Seleccione regimen',
      value: selectedRegimeId,
      onValueChanged: (e) => {
        const selectedRegime = this.regimes.find(
          (regime) => regime.regimeId === e.value
        );

        if (selectedRegime) {
          this.suppliers[index].regimeId = selectedRegime.regimeId;
          this.updateOptions();
        }
      },
    };
  }

  private generateNewDepartmentIdOptions(
    index: number
  ): DxSelectBoxTypes.Properties {
    return {
      dataSource: this.departments,
      valueExpr: 'departmentId',
      displayExpr: 'departmentName',
      searchEnabled: true,
      placeholder: 'Seleccione Departamento',
      onValueChanged: (e) => {
        this.cities = [];
        const selectedDeparment = this.departments.find(
          (department) => department.departmentId === e.value
        );

        if (selectedDeparment) {
          this.suppliers[index].departmentId = selectedDeparment.departmentId;
          this.loadCityByDepartmentId(selectedDeparment.departmentId);
          this.updateOptions();
        }
      },
    };
  }

  private generateNewCityIdOptions(index: number): DxSelectBoxTypes.Properties {
    const selectedCityId = this.suppliers[index]
      ? this.suppliers[index].cityId
      : null;

    return {
      dataSource: this.cities,
      valueExpr: 'cityId',
      displayExpr: 'cityName',
      searchEnabled: true,
      placeholder: 'Seleccione Ciudad',
      value: selectedCityId,
      onValueChanged: (e) => {
        const selectedCity = this.cities.find(
          (country) => country.cityId === e.value
        );

        if (selectedCity) {
          this.suppliers[index].cityId = selectedCity.cityId;
          this.updateOptions();
        }
      },
    };
  }

  private generateNewCountryIdOptions(
    index: number
  ): DxSelectBoxTypes.Properties {
    const selectedCountryId = this.suppliers[index]
      ? this.suppliers[index].countryId
      : null;

    return {
      dataSource: this.countries,
      valueExpr: 'countryId',
      displayExpr: 'countryName',
      searchEnabled: true,
      placeholder: 'Seleccione Pais',
      value: selectedCountryId,
      onValueChanged: (e) => {
        this.departments = [];
        this.cities = [];

        const selectedCountry = this.countries.find(
          (country) => country.countryId === e.value
        );

        if (selectedCountry) {
          this.suppliers[index].countryId = selectedCountry.countryId;
          this.loadDepartmentByCountryId(selectedCountry.countryId);
          this.updateOptions();
        }
      },
    };
  }

  private async loadMasterSupplier() {
    this.masterSuppliers = await this.supplierService
      .getAllSupplier()
      .toPromise();
  }

  private async loadCountry() {
    this.countries = await this.countryService.getAllCountry().toPromise();
  }

  private async loadDepartment() {
    this.departments = await this.departmentService
      .getAllDepartment()
      .toPromise();
  }

  private async loadCity() {
    this.cities = await this.cityService.getAllCity().toPromise();
  }

  private async loadRegime() {
    this.regimes = await this.regimeService.getAllRegime().toPromise();
  }

  private async loadDepartmentByCountryId(countryId: number) {
    this.departments = await this.departmentService
      .GetDepartmentByCountryId(countryId)
      .toPromise();

    this.updateOptions();
  }

  private async loadCityByDepartmentId(departmentId: number) {
    this.cities = await this.cityService
      .GetCitiestByDeparmentId(departmentId)
      .toPromise();

    this.updateOptions();
  }

  private generateNewSuppliersNitOptions(
    index: number
  ): DxTextBoxTypes.Properties {
    const SuppliersAddress = this.suppliers[index]
      ? this.suppliers[index].nit
      : '';
    return {
      value: SuppliersAddress,
      stylingMode: 'filled',
      placeholder: 'Ingrese el nit',
      mode: 'text',
      maxLength: 50,
      readOnly : true,
      onValueChanged: (e) => {
        if (this.suppliers[index]) {
          this.suppliers[index].nit = e.value;
        }
      },
    };
  }

  private generateNewSuppliersAddressOptions(
    index: number
  ): DxTextBoxTypes.Properties {
    const SuppliersAddress = this.suppliers[index]
      ? this.suppliers[index].address
      : '';
    return {
      value: SuppliersAddress,
      stylingMode: 'filled',
      placeholder: 'Ingrese la direccion',
      mode: 'text',
      maxLength: 50,
      onValueChanged: (e) => {
        if (this.suppliers[index]) {
          this.suppliers[index].address = e.value;
        }
      },
    };
  }
 
  private generateNewSuppliersEmailOptions(
    index: number
  ): DxTextBoxTypes.Properties {
    const SuppliersAddress = this.suppliers[index]
      ? this.suppliers[index].address
      : '';
    return {
      value: SuppliersAddress,
      stylingMode: 'filled',
      placeholder: 'Ingrese el correo',
      mode: 'email',
      maxLength: 50,
      onValueChanged: (e) => {
        if (this.suppliers[index]) {
          this.suppliers[index].address = e.value;
        }
      },
    };
  }

  private generateNewSuppliersPhoneOptions(
    index: number
  ): DxTextBoxTypes.Properties {
    const SuppliersPhone = this.suppliers[index]
      ? this.suppliers[index].phone
      : '';
    return {
      value: SuppliersPhone,
      stylingMode: 'filled',
      mask: '+57 (000) 000-0000',
      maskRules: { X: /[01-9]/ },
      onValueChanged: (e) => {
        if (this.suppliers[index]) {
          this.suppliers[index].phone = e.value;
        }
      },
    };
  }

  editSupplier() {
    this.supplierReadOnly = !this.supplierReadOnly;
  }
}

@NgModule({
  declarations: [SupplierComponent],
  exports: [SupplierComponent],
  imports: [
    CommonModule,
    DxFormModule,
    DxButtonModule,
    DxToolbarModule,
    DxTooltipModule,
  ],
})
export class SupplierModule {}
