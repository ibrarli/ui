import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible defaultValue="ownership" className="max-w-lg">
      <AccordionItem value="ownership">
        <AccordionTrigger>Can I customize the components?</AccordionTrigger>
        <AccordionContent>
          Yes. Each component is copied into your project, so you can change its styles,
          behavior and markup without waiting for a library update.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="theme">
        <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
        <AccordionContent>
          Every component uses the Apen theme tokens. Add the dark class to your page
          to switch to the dark palette, or use your own colors.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="keyboard">
        <AccordionTrigger>Can I navigate with the keyboard?</AccordionTrigger>
        <AccordionContent>
          Use the arrow keys to move between questions, then press Enter or Space
          to expand an answer. Home and End jump to the first and last questions.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
