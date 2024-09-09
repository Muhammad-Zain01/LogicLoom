import dynamic from "next/dynamic";

const FlowWrapper = dynamic(
  () => import("@/components/flow/components/flow-wrapper"),
  {
    ssr: false,
  }
);

export default function FlowPage() {
  return <FlowWrapper />;
}
