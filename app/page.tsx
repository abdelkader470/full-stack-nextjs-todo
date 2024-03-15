import { getTodosListAction } from "@/actions/todos.action";
import AddTodoForm from "@/components/AddTodoForm";
import TodoTable from "@/components/TodoTable";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = auth();
  const todos = await getTodosListAction({ userId });
  return (
    <main className="container">
      <div className="mx-auto flex w-full lg:w-3/4 flex-col justify-center space-y-4 mt-10">
        <AddTodoForm userId={userId} />
        <TodoTable todos={todos} />
      </div>
    </main>
  );
}
