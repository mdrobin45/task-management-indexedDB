import { useEffect, useState } from "react";
import CreateTaskForm from "./components/CreateTaskForm";
import Modal from "./components/Modal";
import TaskList from "./components/TaskList";
import {
   // addTask,
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
   // const [title, setTitle] = useState("");
   // const [description, setDescription] = useState("");
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
   const [isPopupOpen, setIsPopupOpen] = useState(false);

   const openPopup = () => setIsPopupOpen(true);
   const closePopup = () => setIsPopupOpen(false);

   return (
      <div className="min-h-screen bg-gray-100 py-8">
         <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
               Task Manager
            </h1>
            <div className="flex gap-x-5">
               <div className="w-[40%] gap-x-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sticky top-[20px] h-[100%] bg-white rounded-lg shadow-md p-6 mb-8">
                  <button
                     onClick={openPopup}
                     className="w-full cursor-pointer h-[50px] flex items-center justify-center border-1 border-gray-200 rounded-xl">
                     <p>Text Field</p>
                  </button>
                  <button className="w-full cursor-pointer h-[50px] flex items-center justify-center border-1 border-gray-200 rounded-xl">
                     <p>Dropdown</p>
                  </button>
                  <button className="w-full cursor-pointer h-[50px] flex items-center justify-center border-1 border-gray-200 rounded-xl">
                     <p>Multiple Select</p>
                  </button>
               </div>
               <Modal
                  isOpen={isPopupOpen}
                  onClose={closePopup}
                  title="Welcome to our Popup!">
                  <h2>Hello</h2>
               </Modal>
               <div className="w-[60%]">
                  <CreateTaskForm />

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
