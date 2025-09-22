import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddWordComponent } from './add-word/add-word.component';
import { VocabListComponent } from './vocab-list/vocab-list.component';
import { QuizComponent } from './quiz/quiz.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-word', component: AddWordComponent },
  { path: 'vocab', component: VocabListComponent },
  { path: 'quiz', component: QuizComponent },
];