import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TarjetaCreditoModule } from '../models/tarjeta-credito/tarjeta-credito.module';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private tarjeta$ = new Subject<any>();

  constructor( private firestore: AngularFirestore) { }

  // Este método va a agregar una tarjeta a la colección tarjetas, si la colección no existe la ava a crear
  guardarTarjeta(tarjeta: TarjetaCreditoModule):Promise<any> {
    return this.firestore.collection('tarjetas').add(tarjeta);
  }
  obtenerTarjetas():Observable<any>{
    return this.firestore.collection('tarjetas', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  EliminarTarjeta(id: string): Promise<any>{
    return this.firestore.collection('tarjetas').doc(id).delete();
  }

  editarTarjeta(id: string, tarjeta:any): Promise<any>{
    return this.firestore.collection('tarjetas').doc(id).update(tarjeta);
  }

  addTarjetaEdit(tarjeta: TarjetaCreditoModule){
    this.tarjeta$.next(tarjeta);
  }

  getTarjetaEdit():Observable<TarjetaCreditoModule>{
    return this.tarjeta$.asObservable();
  }
}
