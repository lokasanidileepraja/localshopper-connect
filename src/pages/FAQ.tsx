import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const FAQ = () => {
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. Payment information is securely processed through our payment gateway."
    },
    {
      question: "How long does shipping take?",
      answer: "Domestic shipping typically takes 3-5 business days. International shipping can take 7-14 business days depending on the destination."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Contact our support team to initiate a return."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can use this to track your package on our website."
    }
  ];

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <Card className="p-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
};

export default FAQ;