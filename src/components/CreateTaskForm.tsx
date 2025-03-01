import { PlusCircle } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldType } from "../lib/types";

interface CreateTaskFormProps {
   fields: FieldType[];
}
export default function CreateTaskForm({ fields }: CreateTaskFormProps) {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const [inputElements, setInputElement] = useState<JSX.Element[]>([]);

   // Create JSX element base on field type
   useEffect(() => {
      const newElement = fields.map((field) => {
         switch (field.type) {
            case "text": {
               return (
                  <div className="mb-4">
                     <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                        {field.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <input
                        {...register(field.name, { required: field.required })}
                        type={field.type}
                        id={field.id}
                        className={field.classes}
                        placeholder={field.placeholder}
                     />
                     {errors[field.name] && (
                        <p className="text-red-500 pt-2">
                           This field is required
                        </p>
                     )}
                  </div>
               );
            }
            case "textarea": {
               return (
                  <div className="mb-4">
                     <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                        {field.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <textarea
                        {...register(field.name, { required: true })}
                        // type={field.type}
                        id={field.id}
                        className={field.classes}
                        placeholder={field.placeholder}
                     />
                     {errors[field.name] && (
                        <p className="text-red-500 pt-2">
                           This field is required
                        </p>
                     )}
                  </div>
               );
            }
            case "email": {
               return (
                  <div className="mb-4">
                     <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                        {field.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <input
                        {...register(field.name, { required: true })}
                        type={field.type}
                        id={field.id}
                        className={field.classes}
                        placeholder={field.placeholder}
                     />
                     {errors[field.name] && (
                        <p className="text-red-500 pt-2">
                           This field is required
                        </p>
                     )}
                  </div>
               );
            }
            case "tel": {
               return (
                  <div className="mb-4">
                     <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                        {field.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <input
                        {...register(field.name, { required: true })}
                        type={field.type}
                        id={field.id}
                        className={field.classes}
                        placeholder={field.placeholder}
                     />
                     {errors[field.name] && (
                        <p className="text-red-500 pt-2">
                           This field is required
                        </p>
                     )}
                  </div>
               );
            }
            case "number": {
               return (
                  <div className="mb-4">
                     <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                        {field.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <input
                        {...register(field.name, { required: true })}
                        type={field.type}
                        id={field.id}
                        className={field.classes}
                        placeholder={field.placeholder}
                     />
                     {errors[field.name] && (
                        <p className="text-red-500 pt-2">
                           This field is required
                        </p>
                     )}
                  </div>
               );
            }
            case "select": {
               return (
                  <div className="mb-4">
                     <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                        {field.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <select
                        {...register(field.name, { required: true })}
                        id={field.id}
                        className={field.classes}>
                        <option disabled>{field.placeholder}</option>
                        {field.options?.map((option, index) => (
                           <option key={index} value={option}>
                              {option}
                           </option>
                        ))}
                     </select>
                     {errors[field.name] && (
                        <p className="text-red-500 pt-2">
                           This field is required
                        </p>
                     )}
                  </div>
               );
            }
            case "radio": {
               return (
                  <div className="mb-4">
                     <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                        {field.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <div className="flex space-x-4">
                        {field.options?.map((option, index) => (
                           <div className="flex gap-x-1" key={index}>
                              <input
                                 {...register(field.name, { required: true })}
                                 type={field.type}
                                 id={option}
                                 value={option}
                              />
                              <label htmlFor={option}>{option}</label>
                           </div>
                        ))}
                     </div>
                     {errors[field.name] && (
                        <p className="text-red-500 pt-2">
                           This field is required
                        </p>
                     )}
                  </div>
               );
            }
            case "checkbox": {
               return (
                  <div className="mb-4">
                     <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                        {field.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <div className="flex space-x-4">
                        {field.options?.map((option, index) => (
                           <div className="flex gap-x-1" key={index}>
                              <input
                                 {...register(field.name, { required: true })}
                                 type={field.type}
                                 id={option}
                                 value={option}
                              />
                              <label htmlFor={option}>{option}</label>
                           </div>
                        ))}
                     </div>
                     {errors[field.name] && (
                        <p className="text-red-500 pt-2">
                           This field is required
                        </p>
                     )}
                  </div>
               );
            }
            case "date": {
               return (
                  <div className="mb-4">
                     <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                        {field.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <input
                        {...register(field.name, { required: true })}
                        type={field.type}
                        id={field.id}
                        className={field.classes}
                        placeholder={field.placeholder}
                     />
                     {errors[field.name] && (
                        <p className="text-red-500 pt-2">
                           This field is required
                        </p>
                     )}
                  </div>
               );
            }

            default:
               return null;
         }
      });

      setInputElement(newElement.filter((element) => element !== null));
   }, [fields, errors, register]);

   // Submit form data
   const submitHandler = (data: Record<string, string>) => {
      console.log(data);
   };
   return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
         <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add New Task
         </h2>
         <form onSubmit={handleSubmit(submitHandler)}>
            {inputElements.map((element, index) => (
               <div key={index}>{element}</div>
            ))}
            <button
               type="submit"
               className="flex items-center cursor-pointer justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
               <PlusCircle size={18} className="mr-2" />
               Add Task
            </button>
         </form>
      </div>
   );
}
