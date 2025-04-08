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
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import SectionContainer  from "@/components/section-container";
import type { FormValues } from "@/lib/form-schema";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";

interface TeamLeadersSectionProps {
  form: UseFormReturn<FormValues>;
}

export function TeamLeadersSection({ form }: TeamLeadersSectionProps) {
  useEffect(() => {
    const currentLeaders = form.getValues().team_leaders || [];
    if (currentLeaders.length !== 1) {
      form.setValue("team_leaders", [
        {
          full_name: "",
          email: "",
          phone_number: "",
          passport_scan: new File([""], "placeholder.pdf"),
          id_photo: new File([""], "placeholder.jpg"),
        },
      ]);
    }
    form.setValue("team_leaders_count", "1");
  }, [form]);

  return (
    <SectionContainer title="Team Leader">
      <div className="space-y-6">
        <Card className="border-slate-200 shadow-sm overflow-hidden sm:rounded-lg">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-medium text-slate-700">Team Leader</h3>
          </div>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="team_leaders.0.full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      Full Name
                    </FormLabel>
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
                name="team_leaders.0.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Email</FormLabel>
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
                name="team_leaders.0.phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      Phone Number
                    </FormLabel>
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

             
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="font-medium text-slate-700 mb-3">File Uploads for Team Leader</h3>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="team_leaders.0.passport_scan"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Passport Scan</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="passport-scan"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                onChange(file);
                              }
                            }}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full bg-white border-slate-300 hover:bg-slate-50 text-slate-700"
                            onClick={() =>
                              document.getElementById("passport-scan")?.click()
                            }
                          >
                            <Upload className="mr-2 h-4 w-4 text-slate-500" />
                            {value instanceof File
                              ? value.name
                              : "Upload Passport Scan (PDF/JPG)"}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="team_leaders.0.id_photo"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel className="sr-only">ID Photo</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="hidden"
                            id="id-photo"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                onChange(file);
                              }
                            }}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full bg-white border-slate-300 hover:bg-slate-50 text-slate-700"
                            onClick={() =>
                              document.getElementById("id-photo")?.click()
                            }
                          >
                            <Upload className="mr-2 h-4 w-4 text-slate-500" />
                            {value instanceof File
                              ? value.name
                              : "Upload ID Photo (JPG/PNG, high quality)"}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-3 p-3 bg-blue-50 rounded-md border border-blue-100">
                <p className="text-sm text-blue-700 mb-2 font-medium">Sample Files:</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-blue-600">
                    <Download className="h-4 w-4 mr-1" />
                    <a
                      href="/docs/passport.pdf"
                      target="_blank"
                      className="hover:underline"
                    >
                      Download Sample Passport Scan
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-blue-600">
                    <Download className="h-4 w-4 mr-1" />
                    <a
                      href="/images/id_photo.png"
                      target="_blank"
                      className="hover:underline"
                    >
                      Download Sample ID Photo
                    </a>
                  </div>
                </div>
              </div>
            </div>
            </CardContent>
          </Card>
        </div>
      </SectionContainer>
    );
}
