import ShortText from "./fields/short-text";
import Divider from "./fields/divider";
import Heading from "./fields/heading";
import Button from "./fields/button";
import LongText from "./fields/long-text";
import Number from "./fields/number";
import Dropdown from "./fields/dropdown";
import Currency from "./fields/currency";
import Description from "./fields/description";
import Phone from "./fields/phone";
import Ratings from "./fields/ratings";
import SelectBox from "./fields/checkbox";
import Youtube from "./fields/youtube";
import RadioItem from "./fields/radio";
import RichTextEditor from "./fields/rich-text-editor";
import DateItem from "./fields/date";
import DateTimeItem from "./fields/date-time";
import DateRangeItem from "./fields/date-range";
import TimeItem from "./fields/time";

const FieldMap = {
  short_text: ShortText,
  long_text: LongText,
  number: Number,
  dropdown: Dropdown,
  button: Button,
  divider: Divider,
  heading: Heading,
  currency: Currency,
  description: Description,
  phone: Phone,
  rating: Ratings,
  checkbox: SelectBox,
  youtube: Youtube,
  radio: RadioItem,
  rich_text: RichTextEditor,
  date: DateItem,
  date_time: DateTimeItem,
  date_range: DateRangeItem,
  time: TimeItem,
};

export default FieldMap;
