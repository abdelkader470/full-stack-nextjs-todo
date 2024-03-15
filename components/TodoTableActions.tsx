"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";
import { deleteTodoAction } from "@/actions/todos.action";
import { ITodo } from "@/interfaces";
import Spinner from "./Spinner";
import EditTodoForm from "./EditTodoForm";

const TodoTableActions = ({ todo }: { todo: ITodo }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="space-x-2">
      <EditTodoForm todo={todo} />
      <Button
        variant={"destructive"}
        size={"icon"}
        onClick={async () => {
          setIsLoading(true);
          await deleteTodoAction({ id: todo.id });
          setIsLoading(false);
        }}
      >
        {isLoading ? <Spinner /> : <Trash />}
      </Button>
    </div>
  );
};

export default TodoTableActions;
