import Input from "./Input";
import RHForm from "./RHForm";
import DatePicker from "./DatePicker";
import RangePicker from "./RangePicker";
import { Title } from "./RHForm/styles";

type FormType = typeof RHForm;

interface FormInterface extends FormType {
  Input: typeof Input;
  DatePicker: typeof DatePicker;
  RangePicker: typeof RangePicker;
  Title: typeof Title;
}

const Form = RHForm as FormInterface;
Form.Input = Input;
Form.DatePicker = DatePicker;
Form.Title = Title;
Form.RangePicker = RangePicker;

export default Form;
