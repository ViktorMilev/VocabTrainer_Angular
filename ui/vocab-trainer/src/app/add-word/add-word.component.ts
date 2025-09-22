import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToastrRootModule } from './../toastr-root.module';

import { Language, VocabService, Vocabulary } from '../../../vocab.service';

@Component({
  selector: 'app-add-word',
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, ToastrRootModule],
  templateUrl: './add-word.component.html',
  styleUrl: './add-word.component.css'
})


export class AddWordComponent {
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

  addWord() {
    this.vocabService.addWord(this.newWord).subscribe(() => {
      this.toastr.success('Word added!', '');
      this.newWord = { word: '', translation: '', example: '', category: '', language: '', };
      this.loadVocabulary();
    });
  }

  cancelEdit() {
    this.editingWordId = null;
    this.newWord = { word: '', translation: '', example: '', category: '', language: '' };
  }
}
