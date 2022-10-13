import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResetGuessService {
  constructor(private http: HttpClient) {}

  getResetTimer() {
    return this.http.get<number>(environment.apiUrl + '/reset-guesses-timer');
  }
}
