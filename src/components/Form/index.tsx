import Input from "./Input";
import RHForm from "./RHForm";
import DatePicker from "./DatePicker";
import { Title } from "./RHForm/styles";

type FormType = typeof RHForm;

interface FormInterface extends FormType {
  Input: typeof Input;
  DatePicker: typeof DatePicker;
  Title: typeof Title;
}

const Form = RHForm as FormInterface;
Form.Input = Input;
Form.DatePicker = DatePicker;
Form.Title = Title;

export default Form;
