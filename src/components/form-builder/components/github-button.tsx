import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "../../ui/button";

const GithubButton = () => {
  return (
    <div className="mx-2">
      <a href="https://github.com/Muhammad-Zain01" target="_blank">
        <Button
          variant={"outline"}
          className="flex gap-3 group rounded-lg text-gray-600 transition-all duration-300 "
        >
          <GitHubLogoIcon />
          <span className="font-[300] ">
            Follow <strong className="ml-1 font-medium">Muhammad Zain</strong>
          </span>
        </Button>
      </a>
    </div>
  );
};
export default GithubButton;
