import { Input } from "@/components/ui/input";
import { useFormStore } from "@/store/form";
import { FormItem } from "@/types/form";
import { Label } from "@radix-ui/react-dropdown-menu";
import { GoStar, GoStarFill } from "react-icons/go";

type ComponentProps = {
  question: FormItem;
  onChange: (value: string) => void;
};

const Ratings: React.FC<ComponentProps> & { Settings?: React.FC; onChange } = ({
  question,
  onChange,
}) => {
  let rating_count = Number(question.settings?.rating_count) || 5;
  rating_count = rating_count > 10 ? 10 : rating_count < 3 ? 3 : rating_count;
  const answer = question.answer || 0;
  const onClickRating = (rating: string) => {
    onChange(rating);
  };

  return (
    <div>
      <div className="flex gap-3">
        {new Array(rating_count).fill(0).map((_, index) => {
          if (answer > index) {
            return (
              <GoStarFill
                key={index}
                size={30}
                color="orange"
                className="text-gray-400 cursor-pointer"
                onClick={() => onClickRating(String(index + 1))}
              />
            );
          } else {
            return (
              <GoStar
                key={index}
                size={30}
                className="text-gray-400 cursor-pointer"
                onClick={() => onClickRating(String(index + 1))}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

const Settings: React.FC<{ question: FormItem }> = ({ question }) => {
  const updateQuestion = useFormStore((state) => state.updateQuestion);

  return (
    <>
      <div className="space-y-2 my-3">
        <Label>Rating Count</Label>
        <Input
          type="number"
          max={10}
          min={3}
          value={question?.settings?.rating_count || 5}
          onChange={(e) => {
            updateQuestion(question.id, {
              settings: { ...question.settings, rating_count: e.target.value },
            });
            console.log();
          }}
        />
      </div>
    </>
  );
};

Ratings.Settings = Settings;
Ratings.displayName = "phone";

export default Ratings;
