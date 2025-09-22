import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToastrRootModule } from './../toastr-root.module';
import { VocabService, Vocabulary } from '../../../vocab.service';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastrRootModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})


export class QuizComponent {
  quizWords: Vocabulary[] = [];
  currentIndex: number = 0;
  userAnswer: string = '';
  currentWord: Vocabulary | null = null;

  private toastr = inject(ToastrService);

  constructor(private vocabService: VocabService) {}

  ngOnInit() {
    this.vocabService.getQuizWords().subscribe(words => {
      this.quizWords = this.shuffleArray(words).slice(0, 10);
      this.loadCurrentWord();
    });
  }

  loadCurrentWord() {
    this.currentWord = this.quizWords[this.currentIndex] || null;
    this.userAnswer = '';
  }

  submitQuizAnswer() {
    if (!this.currentWord) return;
    const correct = this.userAnswer.trim().toLowerCase() === this.currentWord.translation.toLowerCase();
    this.vocabService.markKnown(this.currentWord.id, correct).subscribe(() => {
      correct ? this.toastr.success('Correct!', '') : this.toastr.success('Wrong!', '');
      this.currentIndex++;
      this.loadCurrentWord();
    });
  }

  shuffleArray(array: Vocabulary[]) {
    return array.sort(() => Math.random() - 0.5);
  }
}