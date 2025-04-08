import { useFormStore } from "@/store/form";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
// import { CheckCircle2 } from "lucide-react";

const FormSubmitModal = () => {
    const [open, setOpen] = useState(false);
    const { form, editable } = useFormStore((state) => state);
    const formData = form?.filter(item => item.is_form_item) || [];

    // Format the date values
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return format(date, "PPP");
        } catch (error) {
            return dateString;
        }
    };

    // Format the time values
    const formatTime = (timeString: string) => {
        try {
            const date = new Date(timeString);
            return format(date, "p");
        } catch (error) {
            return timeString;
        }
    };

    // Format the datetime values
    const formatDateTime = (dateTimeString: string) => {
        try {
            const date = new Date(dateTimeString);
            return format(date, "PPP p");
        } catch (error) {
            return dateTimeString;
        }
    };

    // Format date range
    const formatDateRange = (dateRangeString: string) => {
        try {
            const dateRange = JSON.parse(dateRangeString);
            let result = "";

            if (dateRange.from) {
                result += `From: ${formatDate(dateRange.from)}`;
            }

            if (dateRange.to) {
                result += ` To: ${formatDate(dateRange.to)}`;
            }

            return result;
        } catch (error) {
            return dateRangeString;
        }
    };

    // Format checkbox values
    const formatCheckbox = (checkboxString: string) => {
        try {
            const values = JSON.parse(checkboxString);
            return values.join(", ");
        } catch (error) {
            return checkboxString;
        }
    };

    // Format currency values
    const formatCurrency = (value: string, currency: string = "USD") => {
        try {
            const numValue = parseFloat(value);
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency
            }).format(numValue);
        } catch (error) {
            return value;
        }
    };

    // Get formatted value based on question type
    const getFormattedValue = (question: any) => {
        if (!question.answer) return "Not answered";

        switch (question.type) {
            case "date":
                return formatDate(question.answer);
            case "time":
                return formatTime(question.answer);
            case "date_time":
                return formatDateTime(question.answer);
            case "date_range":
                return formatDateRange(question.answer);
            case "checkbox":
                return formatCheckbox(question.answer);
            case "currency":
                return formatCurrency(question.answer, question.settings?.currency);
            case "rich_text":
                return <div dangerouslySetInnerHTML={{ __html: question.answer }} />;
            default:
                return question.answer;
        }
    };

    return (
        <>
            {!editable && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="w-full rounded-3xl !mt-5"
                            onClick={() => setOpen(true)}
                        >
                            Submit
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[80vw] max-h-[90vh]">
                        <DialogHeader className="m-0 ">
                            <DialogTitle className="text-2xl m-0 font-bold">Form Submission</DialogTitle>
                        </DialogHeader>
                        <p className="text-gray-600 mt-0 mb-6">
                            Here&apos;s a summary of your responses:
                        </p>
                        <ScrollArea className="max-h-[70vh] pr-4">
                            <div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
                                {formData.map((question) => (
                                    <div
                                        key={question.id}
                                        className="border rounded-xl p-4 bg-gray-50"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-medium text-gray-900">
                                                    {question.label || "Untitled"}
                                                </h3>
                                                {question.description && (
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {question.description}
                                                    </p>
                                                )}
                                            </div>
                                            <Badge  className="capitalize border border-[#353535bb] text-xs shadow-none rounded-xl font-[400] bg-[#b1b1b143]  text-[#353535bb] hover:bg-[#b1b1b187]">
                                                {question.type.replace("_", " ")}
                                            </Badge>
                                        </div>
                                        <div className="mt-3 pt-3 border-t">
                                            <div className="text-gray-700">
                                                {getFormattedValue(question)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default FormSubmitModal;