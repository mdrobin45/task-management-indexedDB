import { GripVertical, Plus, Trash2 } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
// import { InputFieldProps, Option } from '../types';
// import OptionsList from './OptionsList';
// interface InputFieldProps {
//    id: string;
//    type: "text" | "number" | "email" | "password" | "select";
//    label: string;
//    placeholder: string;
//    required: boolean;
//    options?: Option[];
// }
// interface Option {
//    id: string;
//    value: string;
//    label: string;
// }
// interface InputFieldEditorProps {
//    field: InputFieldProps;
//    onUpdate: (field: InputFieldProps) => void;
// }
interface PropsType {
   submitHandler: (data: FieldValues) => void;
   register: ReturnType<typeof useForm>["register"];
   handleSubmit: ReturnType<typeof useForm>["handleSubmit"];
}
const field = { type: "select" };
const FormBuilder = ({ submitHandler, register, handleSubmit }: PropsType) => {
   // const handleChange = (
   //    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   // ) => {
   //    const { name, value, type } = e.target;
   //    const checked =
   //       type === "checkbox"
   //          ? (e.target as HTMLInputElement).checked
   //          : undefined;

   //    onUpdate({
   //       ...field,
   //       [name]: type === "checkbox" ? checked : value,
   //    });
   // };

   // const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
   //    const newType = e.target.value as InputFieldProps["type"];

   //    // Initialize options array if changing to select type
   //    if (newType === "select" && !field.options) {
   //       onUpdate({
   //          ...field,
   //          type: newType,
   //          options: [
   //             { id: `opt-${Date.now()}`, value: "option1", label: "Option 1" },
   //          ],
   //       });
   //    } else {
   //       onUpdate({
   //          ...field,
   //          type: newType,
   //          // Remove options if changing from select type
   //          ...(newType !== "select" && { options: undefined }),
   //       });
   //    }
   // };

   //   const handleOptionsUpdate = (updatedOptions: Option[]) => {
   //     onUpdate({
   //       ...field,
   //       options: updatedOptions,
   //     });
   //   };

   // const handleAddOption = () => {
   //    if (!field.options) return;

   //    const newOption: Option = {
   //       id: `opt-${Date.now()}`,
   //       value: `option${field.options.length + 1}`,
   //       label: `Option ${field.options.length + 1}`,
   //    };

   //    onUpdate({
   //       ...field,
   //       options: [...field.options, newOption],
   //    });
   // };

   //   const handleRemoveOption = (optionId: string) => {
   //     if (!field.options) return;

   //     onUpdate({
   //       ...field,
   //       options: field.options.filter(option => option.id !== optionId),
   //     });
   //   };

   return (
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-[20px] h-[100%]">
         <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-semibold">Field Builder</h2>
               <button
                  // onClick={handleAddField}
                  type="submit"
                  className="flex items-center gap-1 font-bold bg-green-500 cursor-pointer text-white px-3 py-2 rounded hover:bg-green-600">
                  <Plus size={16} />
                  Add Field
               </button>
            </div>

            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                     Field Type
                  </label>
                  <select
                     // value={field.type}
                     // onChange={handleTypeChange}
                     {...register("type", { required: true })}
                     className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500">
                     <option value="text">Text</option>
                     <option value="number">Number</option>
                     <option value="tel">Phone</option>
                     <option value="textarea">Textarea</option>
                     <option value="email">Email</option>
                     <option value="date">Date Calendar</option>
                     <option value="select">Select Dropdown</option>
                  </select>
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                     Label
                  </label>
                  <input
                     {...register("label", { required: true })}
                     type="text"
                     className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                     Placeholder
                  </label>
                  <input
                     {...register("placeholder", { required: true })}
                     type="text"
                     className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  />
               </div>

               <div className="flex items-center">
                  <input
                     {...register("required")}
                     type="checkbox"
                     id="required"
                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                     htmlFor="required"
                     className="ml-2 block text-sm text-gray-700">
                     Required field
                  </label>
               </div>

               {field.type === "select" && (
                  <div className="mt-6">
                     <div className="flex justify-between items-center mb-2">
                        <h3 className="text-md font-medium">Options</h3>
                        <button
                           // onClick={handleAddOption}
                           className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                           Add Option
                        </button>
                     </div>

                     {/* {field.options && field.options.length > 0 ? (
              <OptionsList 
                options={field.options} 
                onOptionsUpdate={handleOptionsUpdate} 
                onRemoveOption={handleRemoveOption}
              />
            ) : (
              <p className="text-sm text-gray-500">No options added yet.</p>
            )} */}
                     <div className="flex items-center gap-2 p-2 border border-gray-200 rounded bg-gray-50">
                        <div className="cursor-grab text-gray-400 hover:text-gray-600">
                           <GripVertical size={20} />
                        </div>

                        <div className="flex-1 grid grid-cols-2 gap-2">
                           <input
                              type="text"
                              // value={option.label}
                              // onChange={(e) => handleOptionChange(option.id, 'label', e.target.value)}
                              placeholder="Label"
                              className="p-1 text-sm border border-gray-300 rounded"
                           />
                           <input
                              type="text"
                              // value={option.value}
                              // onChange={(e) => handleOptionChange(option.id, 'value', e.target.value)}
                              placeholder="Value"
                              className="p-1 text-sm border border-gray-300 rounded"
                           />
                        </div>

                        <button
                           //  onClick={() => onRemoveOption(option.id)}
                           className="text-red-500 hover:text-red-700"
                           aria-label="Remove option">
                           <Trash2 size={16} />
                        </button>
                     </div>
                  </div>
               )}
            </div>
         </form>
      </div>
   );
};

export default FormBuilder;
