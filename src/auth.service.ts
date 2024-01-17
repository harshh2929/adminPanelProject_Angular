import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = 'https://localhost:7207/api';

    constructor(private httpClient: HttpClient) { }

    signup(username: string, email: string, password: string): Observable<any> {
        const url = `${this.baseUrl}/Signup`;
        const userData = { username, email, password };
        return this.httpClient.post(url, userData);
    }

    login(username: string, password: string): Observable<any> {
        const url = `${this.baseUrl}/Login`;
        const userData = { username, password };
        return this.httpClient.post(url, userData);
    }
}
