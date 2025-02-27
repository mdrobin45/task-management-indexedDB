import { Edit, PlusCircle, Save, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
   addTask,
   deleteTask,
   editTask,
   getTasks,
} from "./lib/indexedDBOperations";

// Task type definition
interface Task {
   id: string;
   title: string;
   description: string;
   completed: boolean;
}

function App() {
   const [tasks, setTasks] = useState<Task[]>([]);
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [editingId, setEditingId] = useState<string | null>(null);
   const [editTitle, setEditTitle] = useState("");
   const [editDescription, setEditDescription] = useState("");

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
   const handleAddTask = (e: React.FormEvent) => {
      e.preventDefault();

      const newTask: Task = {
         id: Date.now().toString(),
         title,
         description,
         completed: false,
      };

      addTask(newTask);
      setTitle("");
      setDescription("");
   };

   // Toggle task completion status
   // const handleToggleComplete = (id: string) => {
   //    setTasks(
   //       tasks.map((task) =>
   //          task.id === id ? { ...task, completed: !task.completed } : task
   //       )
   //    );
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
         <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
               Task Manager
            </h1>

            {/* Create Task Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
               <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Add New Task
               </h2>
               <form onSubmit={handleAddTask}>
                  <div className="mb-4">
                     <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                     </label>
                     <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter task title"
                        required
                     />
                  </div>
                  <div className="mb-4">
                     <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                     </label>
                     <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter task description"
                        rows={3}
                     />
                  </div>
                  <button
                     type="submit"
                     className="flex items-center cursor-pointer justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                     <PlusCircle size={18} className="mr-2" />
                     Add Task
                  </button>
               </form>
            </div>

            {/* Task List */}
            <div className="bg-white rounded-lg shadow-md p-6">
               <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Tasks ({tasks.length})
               </h2>

               {tasks.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                     No tasks yet. Add one above!
                  </p>
               ) : (
                  <ul className="divide-y divide-gray-200">
                     {tasks.map((task) => (
                        <li key={task.id} className="py-4">
                           {editingId === task.id ? (
                              <div className="space-y-3">
                                 <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) =>
                                       setEditTitle(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                 />
                                 <textarea
                                    value={editDescription}
                                    onChange={(e) =>
                                       setEditDescription(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={2}
                                 />
                                 <div className="flex space-x-2">
                                    <button
                                       onClick={handleSaveEdit}
                                       className="flex items-center cursor-pointer px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700">
                                       <Save size={16} className="mr-1" />
                                       Save
                                    </button>
                                    <button
                                       onClick={() => {
                                          setEditingId(null);
                                       }}
                                       className="flex items-center cursor-pointer px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                                       <X size={16} className="mr-1" />
                                       Cancel
                                    </button>
                                 </div>
                              </div>
                           ) : (
                              <div>
                                 <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3">
                                       {/* <input
                                          type="checkbox"
                                          checked={task.completed}
                                          onChange={() =>
                                             handleToggleComplete(task.id)
                                          }
                                          className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                       /> */}
                                       <div>
                                          <h3
                                             className={`text-lg font-medium ${
                                                task.completed
                                                   ? "line-through text-gray-500"
                                                   : "text-gray-900"
                                             }`}>
                                             {task.title}
                                          </h3>
                                          {task.description && (
                                             <p
                                                className={`mt-1 text-sm ${
                                                   task.completed
                                                      ? "text-gray-400"
                                                      : "text-gray-600"
                                                }`}>
                                                {task.description}
                                             </p>
                                          )}
                                       </div>
                                    </div>
                                    <div className="flex space-x-2">
                                       <button
                                          onClick={() => handleStartEdit(task)}
                                          className="p-1 text-blue-600 cursor-pointer hover:text-blue-800"
                                          aria-label="Edit task">
                                          <Edit size={18} />
                                       </button>
                                       <button
                                          onClick={() => deleteTask(task.id)}
                                          className="p-1 text-red-600 cursor-pointer hover:text-red-800"
                                          aria-label="Delete task">
                                          <Trash2 size={18} />
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           )}
                        </li>
                     ))}
                  </ul>
               )}
            </div>
         </div>
      </div>
   );
}

export default App;
