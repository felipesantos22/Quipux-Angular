import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlaylistListComponent } from './components/playlist-list/playlist-list.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PlaylistListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'music-app';
}
