import { GoStar } from "react-icons/go";

const Ratings = () => {
  return (
    <div>
      <div className="flex gap-3">
        {/* <GoStarFill size={30} color="orange" /> */}
        {new Array(5).fill(0).map((_, index) => {
          return <GoStar key={index} size={30} className="text-gray-400" />;
        })}
      </div>
    </div>
  );
};

export default Ratings;
