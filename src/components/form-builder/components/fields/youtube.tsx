import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStore } from "@/store/form";
import { FormItem } from "@/types/form";

type ComponentProps = {
  question: FormItem;
};
const Youtube: React.FC<ComponentProps> & { Settings?: React.FC } = ({
  question,
}) => {
  const code = question.settings?.video_code;
  const url = `https://www.youtube.com/embed/${code}`;

  return (
    <div>
      {question.label && <div className="mb-3">{question.label}</div>}
      {question.description && (
        <div className="mb-3 text-xs text-gray-400">{question.description}</div>
      )}
      <iframe
        width="100%"
        height="315"
        src={url}
        title={question.label}
        // @ts-ignore
        frameborder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
};

const Settings: React.FC<{ question: FormItem }> = ({ question }) => {
  const updateQuestion = useFormStore((state) => state.updateQuestion);

  return (
    <>
      <div className="space-y-2 my-3">
        <Label>Video Url</Label>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">
            www.youtube.com/embed/
          </span>
          <Input
            className="text-sm"
            value={question?.settings?.video_code}
            onChange={(e) => {
              updateQuestion(question.id, {
                settings: { ...question.settings, video_code: e.target.value },
              });
            }}
            placeholder="Video Code"
          />
        </div>
      </div>
    </>
  );
};
// @ts-ignore
Youtube.Settings = Settings;
Youtube.displayName = "youtube";

export default Youtube;
