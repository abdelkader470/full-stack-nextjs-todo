"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { TodoFormValues, todoFormSchema } from "@/schema";
import { useState } from "react";
import Spinner from "./Spinner";
import { createTodoAction, updateTodoAction } from "@/actions/todos.action";
import { ITodo } from "@/interfaces";

const EditTodoForm = ({ todo }: { todo: ITodo }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const defaultValues: Partial<TodoFormValues> = {
    title: todo.title,
    body: todo.body as string,
    completed: todo.completed,
  };
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const onSubmit = async (data: TodoFormValues) => {
    setLoading(true);
    await updateTodoAction({
      title: data.title,
      completed: data.completed,
      body: data.body as string,
      id: todo.id,
    });
    setLoading(false);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"}>
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit This Todo</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Write Your Todo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write Short description Here..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-1">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Completed</FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit">{loading ? <Spinner /> : "Save"}</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoForm;
