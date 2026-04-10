import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from './student.service';
import { Student } from './student.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  students: Student[] = [];
  form: Student = { name: '', email: '', course: '' };
  editingId: number | null = null;

  constructor(private service: StudentService) {}

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe(data => this.students = data);
  }

  submit() {
    if (this.editingId !== null) {
      this.service.update(this.editingId, this.form).subscribe(() => this.reset());
    } else {
      this.service.create(this.form).subscribe(() => this.reset());
    }
  }

  edit(s: Student) {
    this.editingId = s.id!;
    this.form = { ...s };
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.load());
  }

  reset() {
    this.form = { name: '', email: '', course: '' };
    this.editingId = null;
    this.load();
  }
}
