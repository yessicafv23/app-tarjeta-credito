import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCreditoModule } from 'src/app/models/tarjeta-credito/tarjeta-credito.module';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tajetas',
  templateUrl: './listar-tajetas.component.html',
  styleUrls: ['./listar-tajetas.component.scss']
})
export class ListarTajetasComponent implements OnInit {

  listTarjetas: TarjetaCreditoModule[] =[];

  constructor(private _tarjetaService: TarjetaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._tarjetaService.obtenerTarjetas().subscribe(doc =>{
      //console.log(datos);
      this.listTarjetas = [];
      doc.forEach((element:any) => {
        this.listTarjetas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
        //console.log(element.payload.doc.id);
        //console.log(element.payload.doc.data());
      });
      console.log(this.listTarjetas);
    })
  }

  eliminarTarjeta(id: any){
    this._tarjetaService.EliminarTarjeta(id).then(() =>{
      this.toastr.error('La tarjeta fue eliminada exitosamente!!', 'Registro eliminado')
    }, error => {
      console.log(error);
      this.toastr.error('Opps... Ocurrio un error','Error' );
    })
  }

  editarTarjeta(tarjeta: TarjetaCreditoModule){
    this._tarjetaService.addTarjetaEdit(tarjeta);
  }


}
