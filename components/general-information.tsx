"use client";

import type { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionContainer } from "./section-container";
import type { formSchema } from "../lib/schema";
import type { z } from "zod";

interface GeneralInformationSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export default function GeneralInformationSection({
  form,
}: GeneralInformationSectionProps) {
  return (
    <SectionContainer title="General Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-medium">
                Country
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white border-slate-300 h-11">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="cn">China</SelectItem>
                  <SelectItem value="in">India</SelectItem>
                  <SelectItem value="br">Brazil</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="delegationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-medium">
                Official Delegation Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter delegation name"
                  className="bg-white border-slate-300 h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      </div>
    </SectionContainer>
  );
}
