
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoListItemCreate } from '../models';
import { TodoListItem } from '../models/todo-list-item';
import { count, filter, map, mergeMap, tap } from 'rxjs/operators';
import { TodoDashboard } from '../models/todo-dashboard';
export class TodoDataService {

  private subject: BehaviorSubject<TodoListItem[]>;
  private data: TodoListItem[] = [
    { id: '1', description: 'Build Shelves', completed: false },
    { id: '2', description: 'Rake Leaved', completed: true }
  ];

  currentId = 3;
  constructor() {
    this.subject = new BehaviorSubject(this.data);
    // go to the api and get the data and cache it here.
  }
  getTodoList(): Observable<TodoListItem[]> {
    return this.subject.asObservable();
    // if some component wants to "observe" this data (it means look at it, not change it), they call this.
  }

  addTodoItem(item: TodoListItemCreate): void {
    // 1. Send it to the API
    const itemToAdd: TodoListItem = {
      id: (this.currentId++).toString(),
      description: item.description,
      completed: false
    };
    // 2. Get it back from the API
    // 3. Add it to the cache (this.data)
    this.data = [itemToAdd, ...this.data];
    // 4. Tell the subscribers "Yo, the next issue is out. mash that subscribe button and hit like"
    this.subject.next(this.data); // the next issue of the magazine is available - deliver it to all the subscribers.
  }

  markComplete(item: TodoListItem): void {
    this.data.filter(x => x.id === item.id)[0].completed = true; // should only be one thing with that id.
    this.subject.next(this.data);
  }

  removeCompleted(): void {
    // tell the API to delete all of them or whatever..
    this.data = this.data.filter(x => !x.completed);
    this.subject.next(this.data);
  }

  hasCompletedItems(): Observable<boolean> {
    return this.subject.pipe(
      map(items => items.filter(t => t.completed)), // []
      map(completed => completed.length), // number
      map(num => num > 0)
    );
    /*
      Whenever next is called, *push* the data through the pipe.
      the maps:
        - first - give me just the items that are completed
        - then give me the number of completed items.
        - then tell me if that number > 0
    */
  }

  getDashboard(): Observable<TodoDashboard> {
    return this.subject.pipe(
      map(items => items as TodoListItem[]),
      map(items => {
        return {
          totalTodos: items.length,
          completedTodos: items.filter(item => item.completed).length,
          incompleteTodos: items.filter(item => !item.completed).length
        } as TodoDashboard;
      })
    );
  }
}
