import type { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import { SectionContainer } from "./section-container";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { formSchema } from "../lib/schema";
import type { z } from "zod";

interface TeamLeadersSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export default function TeamLeadersSection({ form }: TeamLeadersSectionProps) {
  // Sample file download configurations
  const sampleFiles = [
    {
      name: "Passport Scan Sample",
      description: "Example of an acceptable passport scan (PDF)",
      type: "PDF",
      downloadLink: "/docs/passport.pdf",
    },
    {
      name: "ID Photo Sample",
      description: "Recommended ID photo format and quality (JPG)",
      type: "JPG",
      downloadLink: "/samples/id-photo-sample.jpg",
    },
  ];

  return (
    <SectionContainer title="Team Leaders">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="leaderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-medium">
                Team Leader`s Full Name
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
          name="leaderEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-medium">
                Team Leader`s Email
              </FormLabel>
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
              <FormLabel className="text-slate-700 font-medium">
                Team Leader`s Phone Number
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
        <FormField
          control={form.control}
          name="accompanyingPersons"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-medium">
                Total Number of Accompanying Persons
              </FormLabel>
              <FormDescription className="text-slate-500 text-sm">
                Team Leaders, Observers, Guests, etc. (excluding contestants)
              </FormDescription>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-white border-slate-300 h-11">
                    <SelectValue placeholder="Select number of accompanying persons" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      </div>
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h3 className="font-medium text-slate-700 mb-3">
          File Uploads for Team Leader (press icon to see the sample)
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Button
              type="button"
              variant="outline"
              className="flex-grow bg-white border-slate-300 hover:bg-slate-50 text-slate-700 cursor-pointer"
            >
              <Upload className="mr-2 h-4 w-4 text-slate-500 cursor-pointer" />
              Upload Passport Scan (PDF/JPG)
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="w-12 h-11 cursor-pointer"
                >
                  <Download className="h-4 w-4 cursor-pointer" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sample File Guidelines</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {sampleFiles.map((file) => (
                    <div
                      key={file.name}
                      className="border rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-semibold text-slate-700">
                          {file.name}
                        </h4>
                        <p className="text-slate-500 text-sm">
                          {file.description}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          File Type: {file.type}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(file.downloadLink, "_blank")}
                      >
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              type="button"
              variant="outline"
              className="flex-grow bg-white border-slate-300 hover:bg-slate-50 text-slate-700 cursor-pointer"
            >
              <Upload className="mr-2 h-4 w-4 text-slate-500 " />
              Upload ID Photo (JPG/PNG, high quality)
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="w-12 h-11 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>ID Photo Guidelines</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-slate-700 mb-2">
                      ID Photo Requirements
                    </h4>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      <li>Recent photo (taken within last 6 months)</li>
                      <li>High-resolution (at least 300 DPI)</li>
                      <li>Plain white or light background</li>
                      <li>Full face, neutral expression</li>
                      <li>File format: JPG or PNG</li>
                      <li>File size: Maximum 5MB</li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
