import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) { 
    console.log('Spotify Service Listo');
  }

  getQuery( query:string ) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQA6IhAv__c9GW1yVzPlgdxySqwbLTyiMVyrL_vYOLKhHs-2rA8tbuPw7XEMmMG9gk49EfDGAk8iu6AkRvq_ASlqw_xqbnRJEixUXsbx9Tw3Q-QLVg-p'
    });

    return this.http.get( url, { headers } );
  }

  getNewReleases( ) {

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQDc_-av3qskRE0X4HYMaL1jke9UI6fC1SLOFrQKDJ_XHLpjG7Btr-NnLx6UgcsTlxnCWPy40BJgk3JVfFi2Esc3fFRMNYUYR1xswFl70XrtiKthkz-v'
    // })

    // return  this.http.get('https://api.spotify.com/v1/browse/new-releases/?limit=20', { headers } )
    //         .pipe( map( (data: any) => data['albums'].items ));

    return this.getQuery('browse/new-releases/?limit=20')
               .pipe( map( (data: any) => data['albums'].items ));

  }

  getArtistas( termino: string ) {

    return this.getQuery(`search?query=${ termino }&type=artist&locale=es-419%2Ces%3Bq%3D0.9&offset=0&limit=14`)
               .pipe( map( (data:any) => data['artists'].items ));


  }

  getArtista( id:string ) {
    
    return this.getQuery(`artists/${id}`);

  }

  getTopTracks( id:string ) {
    
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
           .pipe( map( (data: any) => data['tracks'] ));

  }
}
