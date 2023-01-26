import { Injectable } from '@angular/core';
import { createClient, PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { Todo } from 'src/app/models';
import { environment as e } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(e.supabaseUrl, e.supabaseKey);
  }

  async addTodo(todo: Todo): Promise<any> {
    let { data: Todo, error } = await this.supabase
      .from('Todo')
      .insert(todo)
      .select('*')
    return { data: Todo, error };
  }

  async update(todo: Todo): Promise<any> {
    let { data: Todo, error } = await this.supabase.from('Todo').update(todo).match({id: todo.id}).select();
    return { data: Todo, error };
  }

  async delete(todo: Todo): Promise<any> {
    let { data: Todo, error } = await this.supabase.from('Todo').delete().match({id: todo.id});
    return { data: Todo, error };
  }

  async getTodo(): Promise<any> {
    let result = await this.supabase.from('Todo').select('*');
    return result;
  }

}
