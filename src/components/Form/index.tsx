import Input from "./Input";
import RHForm from "./RHForm";
import DatePicker from "./DatePicker";
import RangePicker from "./RangePicker";
import Radio from "./Radio";
import CheckBox from "./CheckBox";
import { Title } from "./RHForm/styles";

type FormType = typeof RHForm;

interface FormInterface extends FormType {
  Input: typeof Input;
  DatePicker: typeof DatePicker;
  RangePicker: typeof RangePicker;
  Radio: typeof Radio;
  CheckBox: typeof CheckBox;
  Title: typeof Title;
}

const Form = RHForm as FormInterface;
Form.Input = Input;
Form.DatePicker = DatePicker;
Form.Title = Title;
Form.RangePicker = RangePicker;
Form.Radio = Radio;
Form.CheckBox = CheckBox;

export default Form;
