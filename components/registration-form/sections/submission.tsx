import type { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { SectionContainer } from "./section-container"
import type { formSchema } from "../schema"
import type { z } from "zod"

interface SubmissionSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
}

export default function SubmissionSection({ form }: SubmissionSectionProps) {
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
                <FormLabel className="text-slate-700">I confirm that all information provided is accurate</FormLabel>
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
                <FormLabel className="text-slate-700">I agree to the rules and regulations of the Olympiad</FormLabel>
                <FormMessage className="text-red-500" />
              </div>
            </FormItem>
          )}
        />
      </div>
    </SectionContainer>
  )
}

