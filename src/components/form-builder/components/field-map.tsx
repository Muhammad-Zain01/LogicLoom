import SingleLine from "./fields/single-line";
import Divider from "./fields/divider";
import Heading from "./fields/heading";
import Button from "./fields/button";

const FieldMap = {
  short_text: SingleLine,
  button: Button,
  divider: Divider,
  heading: Heading,
};

export default FieldMap;
