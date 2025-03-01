import { Edit, Save, Trash2, X } from "lucide-react";

interface Task {
   id: string;
   title: string;
   description: string;
   completed: boolean;
}

interface PropsType {
   tasks: Task[];
   setTasks: (tasks: Task[]) => void;
   editingId: string | null;
   setEditingId: (id: string | null) => void;
   editTitle: string;
   setEditTitle: (title: string) => void;
   editDescription: string;
   setEditDescription: (description: string) => void;
   deleteTask: (id: string) => void;
   handleSaveEdit: () => void;
   handleStartEdit: (task: Task) => void;
}
export default function TaskList({
   tasks,
   editingId,
   setEditingId,
   editTitle,
   setEditTitle,
   editDescription,
   setEditDescription,
   deleteTask,
   handleSaveEdit,
   handleStartEdit,
}: PropsType) {
   return (
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
                              onChange={(e) => setEditTitle(e.target.value)}
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
   );
}
