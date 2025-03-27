"use client"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Download, FileText } from "lucide-react"
import { SectionContainer } from "@/components/section-container"
import type { FormValues } from "@/lib/form-schema"

interface SubmissionSectionProps {
  form: UseFormReturn<FormValues>
}

export function SubmissionSection({ form }: SubmissionSectionProps) {
  const [rulesDocument, setRulesDocument] = useState<File | null>(null)

  return (
    <SectionContainer title="Submission">
      <div className="space-y-6">
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 mb-6">
          <div className="flex items-center mb-3">
            <FileText className="h-5 w-5 mr-2 text-slate-600" />
            <h3 className="font-medium text-slate-800">Rules and Regulations</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Please download, read, and agree to the official rules and regulations of the Olympiad. You must upload the
            signed copy of this document.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              className="bg-white border-slate-300 hover:bg-slate-50 text-slate-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Rules and Regulations
            </Button>

            <div className="flex-1">
              <Input
                type="file"
                accept=".pdf"
                className="hidden"
                id="rules-regulations-file"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setRulesDocument(file)
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white border-slate-300 hover:bg-slate-50 text-slate-700"
                onClick={() => document.getElementById("rules-regulations-file")?.click()}
              >
                <Upload className="mr-2 h-4 w-4 text-slate-500" />
                {rulesDocument ? rulesDocument.name : "Upload Signed Rules Document (PDF)"}
              </Button>
            </div>
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
    </SectionContainer>
  )
}

