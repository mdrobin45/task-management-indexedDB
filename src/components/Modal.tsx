import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   title: string;
   children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
   const [animationClass, setAnimationClass] = useState("");
   const popupRef = useRef<HTMLDivElement>(null);

   // Handle animation classes
   useEffect(() => {
      if (isOpen) {
         setAnimationClass("animate-in");
         document.body.style.overflow = "hidden";
      } else {
         setAnimationClass("");
         document.body.style.overflow = "";
      }
   }, [isOpen]);

   const handleClose = () => {
      setAnimationClass("animate-out");
      setTimeout(() => {
         onClose();
      }, 300);
   };

   if (!isOpen && animationClass !== "animate-out") return null;

   return (
      <div
         className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
            animationClass === "animate-in"
               ? "bg-black/50 backdrop-blur-sm transition-all duration-300 ease-in-out"
               : animationClass === "animate-out"
               ? "bg-black/0 backdrop-blur-none transition-all duration-300 ease-in-out"
               : "bg-transparent"
         }`}>
         <div
            ref={popupRef}
            className={`bg-white rounded-lg shadow-xl w-full max-w-md mx-auto overflow-hidden ${
               animationClass === "animate-in"
                  ? "transform scale-100 opacity-100 transition-all duration-300 ease-out"
                  : animationClass === "animate-out"
                  ? "transform scale-95 opacity-0 transition-all duration-300 ease-in"
                  : "transform scale-95 opacity-0"
            }`}>
            <div className="flex items-center justify-between p-4 border-b">
               <h3 className="text-lg font-medium">{title}</h3>
               <button
                  onClick={handleClose}
                  className="text-gray-400 cursor-pointer hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full p-1 transition-colors">
                  <X size={20} />
               </button>
            </div>
            <div className="p-4">{children}</div>
         </div>
      </div>
   );
};

export default Modal;
