import { PlusCircle } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldType, optionsType } from "../lib/types";

interface CreateTaskFormProps {
   fields: FieldType[];
}

const inputFields: FieldType[] = [
   {
      name: "title",
      id: "title",
      label: "Title",
      placeholder: "Enter task title",
      type: "text",
      required: true,
      value: "",
   },
   {
      name: "message",
      id: "message",
      label: "Message",
      placeholder: "Write a message",
      type: "textarea",
      required: true,
      value: "Hello",
   },
   {
      name: "country",
      id: "country",
      label: "Country",
      placeholder: "Select Country",
      type: "select",
      required: true,
      value: "ghana",
      options: [
         { value: "nigeria", label: "Nigeria" },
         { value: "ghana", label: "Ghana" },
      ],
   },
   {
      name: "tags",
      id: "tags",
      label: "Tags",
      placeholder: "Select Tags",
      type: "checkbox",
      required: true,
      value: "",
      options: [
         { value: "development", label: "Development" },
         { value: "website", label: "Website" },
      ],
   },
   {
      name: "gender",
      id: "gender",
      label: "Gender",
      placeholder: "Select Gender",
      type: "radio",
      required: false,
      value: "",
      options: [
         { value: "male", label: "Male" },
         { value: "female", label: "Female" },
      ],
   },
];

export default function CreateTaskForm({ fields }: CreateTaskFormProps) {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const [inputElements, setInputElement] = useState<JSX.Element[]>([]);
   const [formFields, setFormFields] = useState<FieldType[]>([]);

   // Create JSX element base on field type
   useEffect(() => {
      const newElement = inputFields.map((field) => {
         const fieldOption = {
            ...field,
            classes:
               "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
         };
         switch (fieldOption.type) {
            case "text": {
               return (
                  <div className="mb-4">
                     <label
                        htmlFor={fieldOption.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldOption.label}
                        {fieldOption.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <input
                        {...register(fieldOption.name, {
                           required: fieldOption.required,
                           value: fieldOption.value,
                        })}
                        type={fieldOption.type}
                        id={fieldOption.id}
                        className={fieldOption.classes}
                        placeholder={fieldOption.placeholder}
                     />
                     {errors[fieldOption.name] && (
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
                        htmlFor={fieldOption.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldOption.label}
                        {fieldOption.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <textarea
                        {...register(fieldOption.name, {
                           required: true,
                           value: fieldOption.value,
                        })}
                        id={fieldOption.id}
                        className={fieldOption.classes}
                        placeholder={fieldOption.placeholder}
                     />
                     {errors[fieldOption.name] && (
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
                        htmlFor={fieldOption.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldOption.label}
                        {fieldOption.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <input
                        {...register(fieldOption.name, {
                           required: true,
                           value: fieldOption.value,
                        })}
                        type={fieldOption.type}
                        id={fieldOption.id}
                        className={fieldOption.classes}
                        placeholder={fieldOption.placeholder}
                     />
                     {errors[fieldOption.name] && (
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
                        htmlFor={fieldOption.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldOption.label}
                        {fieldOption.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <input
                        {...register(fieldOption.name, {
                           required: true,
                           value: fieldOption.value,
                        })}
                        type={fieldOption.type}
                        id={fieldOption.id}
                        className={fieldOption.classes}
                        placeholder={fieldOption.placeholder}
                     />
                     {errors[fieldOption.name] && (
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
                        htmlFor={fieldOption.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldOption.label}
                        {fieldOption.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <input
                        {...register(fieldOption.name, {
                           required: true,
                           value: fieldOption.value,
                        })}
                        type={fieldOption.type}
                        id={fieldOption.id}
                        className={fieldOption.classes}
                        placeholder={fieldOption.placeholder}
                     />
                     {errors[fieldOption.name] && (
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
                        htmlFor={fieldOption.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldOption.label}
                        {fieldOption.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     {fieldOption.options && (
                        <select
                           {...register(fieldOption.name, {
                              required: true,
                              value: fieldOption.value,
                           })}
                           id={fieldOption.id}
                           className={fieldOption.classes}>
                           {fieldOption.options?.map(
                              (option: optionsType, index: number) => (
                                 <option key={index} value={option.value}>
                                    {option.label}
                                 </option>
                              )
                           )}
                        </select>
                     )}
                     {errors[fieldOption.name] && (
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
                        htmlFor={fieldOption.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldOption.label}
                        {fieldOption.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <div className="flex space-x-4">
                        {fieldOption.options?.map((option, index) => (
                           <div className="flex gap-x-1" key={index}>
                              <input
                                 {...register(fieldOption.name, {
                                    required: true,
                                    value: fieldOption.value,
                                 })}
                                 type={fieldOption.type}
                                 id={option.value}
                                 value={option.value}
                              />
                              <label htmlFor={option.value}>
                                 {option.label}
                              </label>
                           </div>
                        ))}
                     </div>
                     {errors[fieldOption.name] && (
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
                        htmlFor={fieldOption.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldOption.label}
                        {fieldOption.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <div className="flex space-x-4">
                        {fieldOption.options?.map((option, index) => (
                           <div className="flex gap-x-1" key={index}>
                              <input
                                 {...register(fieldOption.name, {
                                    required: true,
                                    value: fieldOption.value,
                                 })}
                                 type={fieldOption.type}
                                 id={option.value}
                                 value={option.value}
                              />
                              <label htmlFor={option.value}>
                                 {option.label}
                              </label>
                           </div>
                        ))}
                     </div>
                     {errors[fieldOption.name] && (
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
                        htmlFor={fieldOption.id}
                        className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldOption.label}
                        {fieldOption.required && (
                           <span className="text-red-500"> *</span>
                        )}
                     </label>
                     <input
                        {...register(fieldOption.name, {
                           required: true,
                           value: fieldOption.value,
                        })}
                        type={fieldOption.type}
                        id={fieldOption.id}
                        className={fieldOption.classes}
                        placeholder={fieldOption.placeholder}
                     />
                     {errors[fieldOption.name] && (
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
      const dataKeys = Object.keys(data);
      dataKeys.forEach((key) => {
         const field = inputFields.find((field) => field.name === key);
         if (field?.name === key) {
            field.value = data[key];
         }

         setFormFields((prevFields) => [...prevFields, field as FieldType]);
      });
   };

   useEffect(() => {
      console.log(formFields);
   }, [formFields]);

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
