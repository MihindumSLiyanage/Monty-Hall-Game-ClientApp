import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MontyHall, PlayRequest } from '../models/monty-hall-game.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MontyHallGameService {
  private baseApiUrl: string = environment.baseApiUrl;
  private readonly apiEndpoint = 'api/Game/play';

  formData: MontyHall = new MontyHall();

  constructor(private http: HttpClient) {}

  playGame(playRequest: PlayRequest): Observable<MontyHall> {
    return this.http.post<MontyHall>(
      `${this.baseApiUrl}${this.apiEndpoint}`,
      playRequest
    );
  }
}
