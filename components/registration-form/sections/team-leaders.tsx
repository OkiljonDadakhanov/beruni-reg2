import type { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { SectionContainer } from "./section-container"
import type { formSchema } from "../schema"
import type { z } from "zod"

interface TeamLeadersSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
}

export default function TeamLeadersSection({ form }: TeamLeadersSectionProps) {
  return (
    <SectionContainer title="Team Leaders">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="leaderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-medium">Team Leader's Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter full name as in passport"
                  className="bg-white border-slate-300 h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leaderEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-medium">Team Leader's Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  className="bg-white border-slate-300 h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leaderPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-medium">Team Leader's Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter phone number with country code"
                  className="bg-white border-slate-300 h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accompanyingPersons"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-medium">Total Number of Accompanying Persons</FormLabel>
              <FormDescription className="text-slate-500 text-sm">
                Team Leaders, Observers, Guests, etc. (excluding contestants)
              </FormDescription>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  placeholder="Enter number"
                  className="bg-white border-slate-300 h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h3 className="font-medium text-slate-700 mb-3">File Uploads for Team Leader</h3>
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-white border-slate-300 hover:bg-slate-50 text-slate-700"
          >
            <Upload className="mr-2 h-4 w-4 text-slate-500" />
            Upload Passport Scan (PDF/JPG)
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full bg-white border-slate-300 hover:bg-slate-50 text-slate-700"
          >
            <Upload className="mr-2 h-4 w-4 text-slate-500" />
            Upload ID Photo (JPG/PNG, high quality)
          </Button>
        </div>
      </div>
    </SectionContainer>
  )
}

