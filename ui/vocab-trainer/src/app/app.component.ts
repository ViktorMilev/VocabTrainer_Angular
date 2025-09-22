import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToastrRootModule } from './toastr-root.module';

import { VocabService, Vocabulary } from '../../vocab.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, ToastrRootModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Vocabulary Trainer';
  currentYear: number = new Date().getFullYear();
}