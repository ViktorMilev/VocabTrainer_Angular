import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToastrRootModule } from './../toastr-root.module';

import { VocabService, Vocabulary } from '../../../vocab.service';

@Component({
  selector: 'app-vocab-list',
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, ToastrRootModule],
  templateUrl: './vocab-list.component.html',
  styleUrl: './vocab-list.component.css'
})


export class VocabListComponent {
  vocabList: Vocabulary[] = [];
  newWord = {
    word: '',
    translation: '',
    example: '',
    category: '',
    language: '',
  };
  editingWordId: number | null = null;

  private toastr = inject(ToastrService);

  constructor(private vocabService: VocabService) { }

  ngOnInit(): void {
    this.loadVocabulary();
  }

  loadVocabulary() {
    this.vocabService.getVocabulary().subscribe((data) => {
      this.vocabList = data;
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

  deleteWord(id: number) {
    this.vocabService.deleteWord(id).subscribe(() => {
      this.toastr.success('Word deleted!', '');
      this.loadVocabulary();
    });
  }
}