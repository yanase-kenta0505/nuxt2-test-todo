/*
 * TODO: フォルダ名とファイル名を変更する。
 * TypeScriptの型定義ファイル（＝JavaScriptにビルドされたときには使われないもの）は、
 * ~~/types というフォルダ名にすることが慣習になっています。
 * また、型定義しかないファイルは、 .d.tsという拡張子にする運用になっています。
 * なので、 nuxt2-test-todos/types/TodosType.d.ts というファイル名にします。
 */

// タスク絞り込みの型
export enum Status {
  All = "All",
  Active = "Active",
  Completed = "Completed",
}

//タスク（TODO）の型
export interface TodosType {
  id: string;
  taskName: string;
  selected: boolean;
  done: boolean;
}

/**
 * TODO: 要らなくなったので削除できる。
 */

//全てのタスク（TODOS）の型
export interface LocalTodos {
  todos: {
    storeTodos: TodosType[];
  };
}

/**
 * TODO: この型を廃止する。
 * 実際はTodosTypeで充分に運用できますよね？
 * 1. TodosTypeそのままで使う
 *    全てのフィールドが必須
 * 2. Partial<TodosType>
 *    全てのフィールドが?になって、undefinedになる可能性がある（オプショナル）
 * 3. Partial<TodosType> & Pick<TodosType, 'id'>
 *    idは必須、それ以外はオプショナル
 */

//タスク名を変更する際にactionsに送られるidと新しいタスク名の型
export interface Item {
  id: string;
  newTaskName: string;
}
