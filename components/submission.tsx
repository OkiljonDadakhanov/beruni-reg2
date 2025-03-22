import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { SectionContainer } from "./section-container";
import type { formSchema } from "../lib/schema";
import type { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface SubmissionSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export default function SubmissionSection({ form }: SubmissionSectionProps) {
  const [rulesOpen, setRulesOpen] = useState(false);

  // Path to your rules PDF file
  const rulesFilePath = "/olympiad-rules.pdf";

  // Function to handle rules label click
  const handleRulesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setRulesOpen(true);
  };

  // Function to handle PDF download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = rulesFilePath;
    link.download = "olympiad-rules.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SectionContainer title="Submission">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="confirmAccuracy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-slate-200 p-4 bg-slate-50">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-slate-700">
                  I confirm that all information provided is accurate
                </FormLabel>
                <FormMessage className="text-red-500" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agreeToRules"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-slate-200 p-4 bg-slate-50">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-slate-700">
                  I agree to the{" "}
                  <span
                    className="text-blue-600 hover:text-blue-800 cursor-pointer underline"
                    onClick={handleRulesClick}
                  >
                    rules and regulations
                  </span>{" "}
                  of the Olympiad
                </FormLabel>
                <FormMessage className="text-red-500" />
              </div>
            </FormItem>
          )}
        />
      </div>

      {/* Rules Dialog Modal */}
      <Dialog open={rulesOpen} onOpenChange={setRulesOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto ">
          <DialogHeader>
            <DialogTitle>Olympiad Rules and Regulations</DialogTitle>
          </DialogHeader>

          <div className="p-4">
            {/* Rules content goes here */}
            <div className="prose">
              <h2>1. General Rules</h2>
              <p>
                The Olympiad is conducted under the supervision of the
                organizing committee. All participants must adhere to the rules
                and regulations set forth by the committee.
              </p>

              <h2>2. Eligibility</h2>
              <p>
                Participants must meet the age and qualification requirements as
                specified for each category. Proof of eligibility may be
                required.
              </p>

              <h2>3. Registration</h2>
              <p>
                All participants must complete the registration process by the
                specified deadline. Late registrations may not be accepted.
              </p>

              <h2>4. Conduct During Competition</h2>
              <p>
                Participants are expected to maintain the highest standards of
                integrity. Any form of cheating or misconduct will result in
                immediate disqualification.
              </p>

              <h2>5. Judging</h2>
              <p>
                Decisions made by the judges are final. Appeals may be submitted
                according to the appeal process outlined by the committee.
              </p>

              <h2>6. Awards</h2>
              <p>
                Certificates and prizes will be awarded based on the criteria
                established for each category.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download size={16} />
                Download PDF
              </Button>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SectionContainer>
  );
}
