import mongoose from "mongoose"

const formSchema = new mongoose.Schema({
    formId: { type: String, required: true },
    responses: { type: Object, required: true },
    views: { type: Number, default: 0 },
    starts: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
    submissionDate: { type: Date, required: true },
  });
  
  const FormResponse = mongoose.model('FormResponse', formSchema);
  export default FormResponse