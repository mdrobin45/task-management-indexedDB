import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import CreateTaskForm from "./components/CreateTaskForm";
import FormBuilder from "./components/FormBuilder";
import TaskList from "./components/TaskList";
import {
   // addTask,
   deleteTask,
   editTask,
   getTasks,
} from "./lib/indexedDBOperations";
import { FieldType } from "./lib/types";

// Task type definition
interface Task {
   id: string;
   title: string;
   description: string;
   completed: boolean;
}

// interface FieldType {
//    name: string;
//    label: string;
//    type: string;
//    id: string;
//    classes: string;
//    placeholder: string;
//    options?: string[];
// }

function App() {
   const [tasks, setTasks] = useState<Task[]>([]);
   const { register, handleSubmit } = useForm();
   // const [title, setTitle] = useState("");
   // const [description, setDescription] = useState("");
   const [editingId, setEditingId] = useState<string | null>(null);
   const [editTitle, setEditTitle] = useState("");
   const [editDescription, setEditDescription] = useState("");
   const [fields, setFields] = useState<FieldType[]>([]);

   // Submit form builder data - Lifting state up
   const submitHandler = (data: FieldValues) => {
      const fieldProperties: FieldType = {
         name: data.label.toLowerCase().replace(/\s/g, "-"),
         id: `field-${Date.now()}`,
         label: data.label,
         placeholder: data.placeholder,
         type: data.type,
         required: data.required,
         classes:
            "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
         options: [{ value: "option1", label: "Option 1" }],
      };
      setFields((prevFields) => [...prevFields, fieldProperties]);
   };

   // Get tasks from indexedDb tasks store whenever component mounts and change tasks state
   useEffect(() => {
      const fetchTasks = async () => {
         const savedTasks = await getTasks();
         if (savedTasks) {
            setTasks(savedTasks as Task[]);
         }
      };
      fetchTasks();
   }, [tasks]);

   // Create a new task
   // const handleAddTask = (e: React.FormEvent) => {
   //    e.preventDefault();

   //    const newTask: Task = {
   //       id: Date.now().toString(),
   //       title,
   //       description,
   //       completed: false,
   //    };

   //    addTask(newTask);
   //    setTitle("");
   //    setDescription("");
   // };

   // Start editing a task
   const handleStartEdit = (task: Task) => {
      setEditingId(task.id);
      setEditTitle(task.title);
      setEditDescription(task.description);
   };

   // Save edited task
   const handleSaveEdit = () => {
      if (!editTitle.trim() || !editingId) return;

      const task = tasks.find((item) => item.id === editingId);
      const updatedTask = {
         ...task,
         title: editTitle,
         description: editDescription,
      };

      editTask(updatedTask);
      setEditingId(null);
   };

   return (
      <div className="min-h-screen bg-gray-100 py-8">
         <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
               Task Manager
            </h1>
            <div className="flex gap-x-5">
               <FormBuilder
                  submitHandler={submitHandler}
                  register={register}
                  handleSubmit={handleSubmit}
               />
               <div className="w-[60%]">
                  <CreateTaskForm fields={fields} />

                  <TaskList
                     tasks={tasks}
                     setTasks={setTasks}
                     editingId={editingId}
                     setEditingId={setEditingId}
                     editTitle={editTitle}
                     setEditTitle={setEditTitle}
                     editDescription={editDescription}
                     setEditDescription={setEditDescription}
                     deleteTask={deleteTask}
                     handleSaveEdit={handleSaveEdit}
                     handleStartEdit={handleStartEdit}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
