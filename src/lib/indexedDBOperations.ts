import toast from "react-hot-toast";

interface taskField {
   id?: string | undefined;
   title: string;
   description: string;
   completed?: boolean | undefined;
}
// Open database or create database
let db: IDBDatabase;
const openDB = indexedDB.open("indexedDB", 1);

openDB.onupgradeneeded = () => {
   db = openDB.result;

   if (!db.objectStoreNames.contains("tasks")) {
      db.createObjectStore("tasks", { keyPath: "id" });
   }
};

openDB.onsuccess = () => {
   db = openDB.result;
};

// Add task
export function addTask(task: taskField) {
   const transaction = db.transaction("tasks", "readwrite");
   const store = transaction.objectStore("tasks");
   const req = store.add(task);

   req.onsuccess = () => {
      toast.success("Success");
   };

   req.onerror = (e) => {
      toast.error("Oops! Something went wrong");
      console.log(e);
   };
}

// Get task
export function getTasks() {
   return new Promise((resolve, reject) => {
      const transaction = db.transaction("tasks", "readonly");
      const store = transaction.objectStore("tasks");
      const req = store.getAll();

      req.onsuccess = () => {
         resolve(req.result);
      };
      req.onerror = () => {
         reject(req.result);
      };
   });
}

// Edit task
export function editTask(task: taskField) {
   const transaction = db.transaction("tasks", "readwrite");
   const store = transaction.objectStore("tasks");
   const req = store.put(task);

   req.onsuccess = () => {
      toast.success("Success");
   };

   req.onerror = (e) => {
      toast.error("Oops! Something went wrong");
      console.log(e);
   };
}

// Delete task
export function deleteTask(id: string) {
   const transaction = db.transaction("tasks", "readwrite");
   const store = transaction.objectStore("tasks");
   const req = store.delete(id);

   req.onsuccess = () => {
      toast.success("Success");
   };

   req.onerror = (e) => {
      toast.error("Oops! Something went wrong");
      console.log(e);
   };
}
