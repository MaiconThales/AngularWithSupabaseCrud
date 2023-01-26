import { Component, OnInit } from '@angular/core';
import { Todo } from './models';
import { SupabaseService } from './services/supabase/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todo';
  todo!: Todo;
  resultTodo: Todo[] = [];

  constructor(private supabaseService: SupabaseService) {

  }

  ngOnInit(): void {
    this.todo = new Todo();

    this.supabaseService.getTodo().then((payload) => {
      if(payload.data != null) {
        this.resultTodo = payload.data;
      }
    });
  }

  addTodo(): void {
    let numberRandom = Math.floor(Math.random() * 100);
    this.todo = {
      name: "Test " + numberRandom,
      done: true
    }
    this.supabaseService.addTodo(this.todo)
      .then((payload) => {
        this.resultTodo.push(payload.data[0]);
      })
  }

  update(item: Todo, index: number): void {
    let numberRandom = Math.floor(Math.random() * 100);
    item.name = "Alter " + numberRandom;
    this.supabaseService.update(item)
    .then((payload) => {
      this.resultTodo[index] = payload.data[0];
    });
  }

  check(item: Todo, index: number): void {
    item.done = !item.done;
    this.supabaseService.update(item)
    .then((payload) => {
      this.resultTodo[index] = payload.data[0];
    });
  }

  remove(item: Todo, index: number) : void {
    this.supabaseService.delete(item)
    .then(() => {
      this.resultTodo.splice(index, 1);
    });
  }

}