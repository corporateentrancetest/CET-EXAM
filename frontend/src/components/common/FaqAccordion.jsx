import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/** FAQ accordion built on the shadcn Accordion. */
export function FaqAccordion({ items, testId = "faq-accordion" }) {
  return (
    <Accordion type="single" collapsible className="w-full" data-testid={testId}>
      {items.map((item, i) => (
        <AccordionItem key={i} value={`faq-${i}`} className="border-b border-slate-200">
          <AccordionTrigger
            data-testid={`faq-trigger-${i}`}
            className="text-left font-semibold text-slate-900 hover:text-amber-600 text-base sm:text-lg py-5"
          >
            {item.q}
          </AccordionTrigger>
          <AccordionContent
            data-testid={`faq-content-${i}`}
            className="text-slate-600 text-base leading-relaxed pb-5"
          >
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
