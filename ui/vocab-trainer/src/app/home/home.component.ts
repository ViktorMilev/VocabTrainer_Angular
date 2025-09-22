import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToastrRootModule } from './../toastr-root.module';

import { Language, VocabService, Vocabulary } from '../../../vocab.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, ToastrRootModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Vocabulary Trainer';
  currentYear: number = new Date().getFullYear();
  
  vocabList: Vocabulary[] = [];
  languagesList: Language[] = [];
  newWord = {
    word: '',
    translation: '',
    example: '',
    category: '',
    language: '',
  };
  editingWordId: number | null = null;

  searchTerm = '';

  private toastr = inject(ToastrService);

  constructor(private vocabService: VocabService) {}

  ngOnInit(): void {
     this.loadVocabulary();
     this.loadLanguages();
  }

  loadVocabulary() {
    this.vocabService.getVocabulary().subscribe((data) => {
      this.vocabList = data;
    });
  }

  loadLanguages() {
    this.vocabService.getLanguages().subscribe((language) => {
      this.languagesList = language;
    });
  }



  startEdit(word: Vocabulary) {
    this.editingWordId = word.id;
    this.newWord = { 
      word: word.word,
      translation: word.translation,
      example: word.example ?? '',
      category: word.category ?? '',
      language: word.language ?? '',
    };
  }

  updateWord() {
    if (this.editingWordId === null) return;

    this.vocabService.updateWord(this.editingWordId, this.newWord).subscribe(() => {
      this.toastr.success('Word updated!', '');
      this.newWord = { word: '', translation: '', example: '', category: '', language: '' };
      this.editingWordId = null;
      this.loadVocabulary();
    });;
  }

  deleteWord(id: number) {
    this.vocabService.deleteWord(id).subscribe(() => {
      this.toastr.success('Word deleted!', '');
      this.loadVocabulary();
    });
  }

  get filteredVocabList(): Vocabulary[] {
    const term = (this.searchTerm || '').toLowerCase();
    return this.vocabList.filter(v =>
      (v.word || '').toLowerCase().includes(term) ||
      (v.translation || '').toLowerCase().includes(term)
    );
  } 
}
