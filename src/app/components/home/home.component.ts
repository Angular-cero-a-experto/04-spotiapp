import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  nuevasCanciones : any[] = [];
  loading:boolean;

  error: boolean;
  mensajeError: string = '';

  constructor( private spotify: SpotifyService ) { 
    this.loading = true;
    this.error = false;

    this.spotify.getNewReleases()
        .subscribe( ( data: any ) => {
          this.nuevasCanciones = data;
          this.loading = false;
        }, ( errorService ) => {
          this.loading = false;
          this.error = true;
          this.mensajeError = errorService.error.error.message;
        } );

  }

}
