import { FaHeading, FaRegAddressCard } from "react-icons/fa6";
import { IoCheckboxOutline } from "react-icons/io5";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { HiOutlineSelector } from "react-icons/hi";
import { AiOutlineNumber } from "react-icons/ai";
import { IoText } from "react-icons/io5";
import { MdOutlineShortText } from "react-icons/md";
import { LuFormInput, LuText } from "react-icons/lu";
import { BsCalendar2Date } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import { PiClosedCaptioningLight } from "react-icons/pi";
import { CiTextAlignJustify } from "react-icons/ci";
import { RxDividerHorizontal } from "react-icons/rx";
import { FiPhone } from "react-icons/fi";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { FaSignature } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

const CLASSES = "h-6 w-6 mb-2 text-gray-500 dark:text-gray-400";

export type FieldItem = {
  label: string;
  type: string;
  icon: JSX.Element;
  isFormItem?: boolean;
  isWidget?: boolean;
};

export type FormFieldType = {
  Typography: FieldItem[];
  Components: FieldItem[];
  Widgets: FieldItem[];
};

export type FieldKey = "Typeography" | "Components" | "Widgets";

export const FormFields: FormFieldType = {
  Typography: [
    {
      label: "Heading",
      type: "heading",
      icon: <FaHeading className={CLASSES} />,
      isFormItem: false,
    },
    {
      label: "Description",
      type: "description",
      icon: <CiTextAlignJustify className={CLASSES} />,
      isFormItem: false,
    },
  ],
  Components: [
    {
      label: "Short Text",
      type: "short_text",
      icon: <MdOutlineShortText className={CLASSES} />,
      isFormItem: true,
    },
    {
      label: "Long Text",
      type: "long_text",
      icon: <LuText className={CLASSES} />,
      isFormItem: true,
    },
    {
      label: "Rich Text",
      type: "rich_text",
      icon: <IoText className={CLASSES} />,
      isFormItem: true,
    },
    {
      label: "Number",
      type: "number",
      icon: <AiOutlineNumber className={CLASSES} />,
      isFormItem: true,
    },
    {
      label: "Dropdown",
      type: "dropdown",
      icon: <HiOutlineSelector className={CLASSES} />,
      isFormItem: true,
    },
    {
      label: "Checkbox",
      type: "checkbox",
      icon: <IoCheckboxOutline className={CLASSES} />,
      isFormItem: true,
    },
    {
      label: "Radio",
      type: "radio",
      icon: <IoRadioButtonOnOutline className={CLASSES} />,
      isFormItem: true,
    },
    {
      label: "Date",
      type: "date",
      icon: <BsCalendar2Date className={CLASSES} />,
      isFormItem: true,
    },
    {
      label: "Date Time",
      type: "date_time",
      icon: <BsCalendar2Date className={CLASSES} />,
      isFormItem: true,
    },
    {
      label: "Date Range",
      type: "date_range",
      icon: <BsCalendar2Date className={CLASSES} />,
      isFormItem: true,
    },
    {
      label: "Time",
      type: "time",
      icon: <IoTimeOutline className={CLASSES} />,
      isFormItem: true,
    },
    {
      label: "Currency",
      type: "currency",
      icon: <BsCurrencyDollar className={CLASSES} />,
      isFormItem: true,
    },
    {
      label: "Phone",
      type: "phone",
      icon: <FiPhone className={CLASSES} />,
      isFormItem: true,
    },
    {
      label: "Address",
      type: "address",
      icon: <FaRegAddressCard className={CLASSES} />,
      isFormItem: true,
    },
    {
      label: "Button",
      type: "button",
      icon: <LuFormInput className={CLASSES} />,
      isFormItem: false,
    },
    {
      label: "Divider",
      type: "divider",
      icon: <RxDividerHorizontal className={CLASSES} />,
      isFormItem: false,
    },
  ],
  Widgets: [
    {
      label: "Signature",
      type: "multi_line",
      icon: <FaSignature className={CLASSES} />,
      isWidget: true,
    },
    {
      label: "Youtube",
      type: "multi_line",
      icon: <FaYoutube className={CLASSES} />,
      isWidget: true,
    },
    {
      label: "Rating",
      type: "rating",
      icon: <FaRegStarHalfStroke className={CLASSES} />,
      isWidget: true,
      isFormItem: true,
    },
    {
      label: "Appointment",
      type: "appointment",
      icon: <SlCalender className={CLASSES} />,
      isWidget: true,
    },
  ],
};
