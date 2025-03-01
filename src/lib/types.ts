export interface FieldType {
   name: string;
   label: string;
   type: string;
   id: string;
   classes: string;
   required?: boolean;
   placeholder: string;
   options?: string[];
}

export interface FormBuilderFieldTypes {
   name: string;
   id: string;
   label: string;
   placeholder: string;
   type: string;
   required: boolean;
   options: string;
}
