import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vocabulary {
    id: number;
    word: string;
    translation: string;
    example?: string;
    category?: string;
    language?: string;
    proficiency?: string;
}

export interface Language {
    id: number;
    name: string;
}

@Injectable({
    providedIn: 'root'
})

export class VocabService {
    private apiUrl = 'http://localhost:8000/';

    constructor(private http: HttpClient) {}

    getVocabulary(): Observable<Vocabulary[]> {
        return this.http.get<Vocabulary[]>(this.apiUrl + 'vocabulary');
    }

    getLanguages(): Observable<Language[]> {
        return this.http.get<Language[]>(this.apiUrl + 'languages');
    }

    addWord(wordData: any) {
        const formData = new FormData();
        for (const key in wordData) {
            formData.append(key, wordData[key]);
        }
        return this.http.post(this.apiUrl + 'vocabulary/add', formData);
    }

    updateWord(id: number, data: any) {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        formData.append('id', id.toString());
        return this.http.post(this.apiUrl + 'vocabulary/update', formData);
    }

    deleteWord(id: number) {
        const formData = new FormData();
        formData.append('id', id.toString());
        return this.http.post(this.apiUrl + 'vocabulary/delete', formData);
    }

    getQuizWords() {
        return this.http.get<Vocabulary[]>(this.apiUrl + 'vocabulary/quizwords');
    }

    markKnown(id: Number, correct: boolean) {
        const formData = new FormData();
        formData.append('id', id.toString());
        formData.append('correct', String(correct));
        return this.http.post(this.apiUrl + 'vocabulary/mark_known', formData);
    }
}