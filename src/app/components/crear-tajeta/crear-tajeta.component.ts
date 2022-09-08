import { TarjetaCreditoModule } from './../../models/tarjeta-credito/tarjeta-credito.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-tajeta',
  templateUrl: './crear-tajeta.component.html',
  styleUrls: ['./crear-tajeta.component.scss']
})
export class CrearTajetaComponent implements OnInit {

  //
  form: FormGroup;
  loading = false;
  titulo = 'Agregar Tarjeta';
  id: string | undefined;

  constructor(private fb: FormBuilder, private _tarjetaService: TarjetaService, private toastr: ToastrService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    })
   }

  ngOnInit(): void {
    this._tarjetaService.getTarjetaEdit().subscribe(data => {
      console.log(data);
      this.id = data.id;
      this.titulo = 'Editar Tarjeta';
      this.form.patchValue({
        titular: data.titular,
        numeroTarjeta: data.numeroTarjeta,
        fechaExpiracion: data.fechaExpiracion,
        cvv: data.cvv
      })
    })
  }

  guardarTarjeta():void{

    if(this.id === undefined){
      // Creamos una nueva tarjeta
      this.agregarTarjeta();

    }else{
      // Editamos la tarjeta
      this.editarTarjeta(this.id);
    }
  }

  agregarTarjeta(){
    const tarjeta: TarjetaCreditoModule = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }
    this.loading = true;
    console.log('Los datos ingresados son: ',  tarjeta);
    this._tarjetaService.guardarTarjeta(tarjeta).then(()=>{
      this.loading = false;
      console.log('Se ha registrado la tarjeta');
      this.toastr.success('Se ha registrado correctamente!!', 'Tarjeta Registrada');
      this.form.reset();
    }, error => {
      this.loading = false;
      console.log('Error en la creación ', error);
      this.toastr.error('Opps... Ocurrio un error','Error' );
    })

  }

  editarTarjeta(id:string){
    const tarjeta: any = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaActualizacion: new Date(),
  }
  this.loading = true;
  this._tarjetaService.editarTarjeta(id, tarjeta).then(() => {
    this.loading = false;
    this.titulo = "Agregar Tarjeta";
    this.form.reset();
    this.id = undefined;
    this.toastr.info('La tarjeta fue actualizada correctamente!!', 'Registro Actualizado');
  }, error => {
    console.log(error);
  });
}
}
