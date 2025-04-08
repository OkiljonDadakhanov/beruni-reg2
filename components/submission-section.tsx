"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import  SectionContainer  from "@/components/section-container"
import type { FormValues } from "@/lib/form-schema"

interface SubmissionSectionProps {
  form: UseFormReturn<FormValues>
}

export function SubmissionSection({ form }: SubmissionSectionProps) {

  return (
    <SectionContainer title="Submission">
      <div className="space-y-6">
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 mb-6">
          <div className="flex items-center mb-3">
            <FileText className="h-5 w-5 mr-2 text-slate-600" />
            <h3 className="font-medium text-slate-800">Rules and Regulations</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Please download, read, and agree to the official rules and regulations of the Olympiad.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="docs/rules.pdf" target="_blank">
              <Button
                type="button"
                variant="outline"
                className="bg-white border-slate-300 hover:bg-slate-50 text-slate-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Rules and Regulations
              </Button>
            </a>

          </div>
        </div>

        <FormField
          control={form.control}
          name="confirm_information"
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
          name="agree_rules"
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
    </SectionContainer >
  )
}