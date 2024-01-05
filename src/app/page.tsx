import Header from "@/ui-components/app-header";
import AlignmentSandbox from "@/ui-components/alignment-sandbox";
import AlignmentFromPreset from "@/ui-components/alignment-preset";
export default function Home() {

  return (
    <Header>
      <AlignmentFromPreset filename="1-1-preset" />
      <AlignmentSandbox />
    </Header>
  )
}
