import { ArrowDown } from "lucide-react";
import { RenderIf } from "@/components/render-if";

export function ScrollToBottomButton({
  visible,
  onClick,
}: {
  visible: boolean;
  onClick: () => void;
}) {
  return (
    <RenderIf condition={visible}>
      <button
        onClick={onClick}
        className="fixed bottom-32 right-[50%] z-10 rounded-full bg-primary p-2 text-white shadow-lg"
        aria-label="Scroll to bottom"
      >
        <ArrowDown className="h-4 w-4" />
      </button>
    </RenderIf>
  );
}
