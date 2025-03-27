import React, { useState } from "react";
import type { UseFormReturn, FieldPath } from "react-hook-form";
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
import { Upload, Download, FileText, Image } from "lucide-react";
import { SectionContainer } from "./section-container";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { z } from "zod";
import type { formSchema } from "../lib/schema";

interface TeamLeadersSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const sampleFiles = [
  {
    name: "Passport Scan Sample",
    description: "Example of an acceptable passport scan (PDF)",
    type: "PDF",
    downloadLink: "/docs/passport.pdf",
    icon: FileText,
  },
  {
    name: "ID Photo Sample",
    description: "Recommended ID photo format and quality (JPG)",
    type: "JPG",
    downloadLink: "/images/id_photo.png",
    icon: Image,
  },
];

export default function TeamLeadersSection({ form }: TeamLeadersSectionProps) {
  const [fileNames, setFileNames] = useState<{
    [key: string]: { passport?: string; idPhoto?: string };
  }>({
    0: {},
    1: {},
  });

  const teamLeadersCount = form.watch("teamLeadersCount") ?? "1";
  const leadersCount = parseInt(teamLeadersCount);

  const handleFileUpload = (
    leaderIndex: number,
    fileType: "passport" | "idPhoto",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileNames((prev) => ({
        ...prev,
        [leaderIndex]: {
          ...prev[leaderIndex],
          [fileType]: file.name,
        },
      }));

      const fieldName = `leader${leaderIndex > 0 ? leaderIndex : ""}${
        fileType === "passport" ? "PassportScan" : "IdPhoto"
      }` as FieldPath<z.infer<typeof formSchema>>;
      form.setValue(fieldName, file);
    }
  };

  const renderFileUploadSection = (leaderIndex: number) => {
    const leaderPrefix = leaderIndex > 0 ? `${leaderIndex}` : "";

    return (
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h3 className="font-medium text-slate-700 mb-3">
          File Uploads for Team Leader
          {leaderIndex > 0 ? ` ${leaderIndex + 1}` : ""} (press icon to see the
          sample)
        </h3>
        <div className="space-y-3">
          {/* Passport Scan Upload */}
          <div className="flex items-center space-x-3">
            <input
              type="file"
              id={`passportScan${leaderPrefix}`}
              accept=".pdf,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => handleFileUpload(leaderIndex, "passport", e)}
            />
            <Button
              type="button"
              variant="outline"
              className="flex-grow bg-white border-slate-300 hover:bg-slate-50 text-slate-700 cursor-pointer"
              onClick={() =>
                document.getElementById(`passportScan${leaderPrefix}`)?.click()
              }
            >
              <Upload className="mr-2 h-4 w-4 text-slate-500 cursor-pointer" />
              Upload Passport Scan (PDF/JPG)
              {fileNames[leaderIndex]?.passport && (
                <span className="ml-2 text-sm text-green-600">
                  {fileNames[leaderIndex].passport}
                </span>
              )}
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
                  <DialogTitle>Passport Scan Guidelines</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {sampleFiles
                    .filter((file) => file.name === "Passport Scan Sample")
                    .map((file) => (
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
                          onClick={() =>
                            window.open(file.downloadLink, "_blank")
                          }
                        >
                          <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                      </div>
                    ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* ID Photo Upload */}
          <div className="flex items-center space-x-3">
            <input
              type="file"
              id={`idPhoto${leaderPrefix}`}
              accept=".jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => handleFileUpload(leaderIndex, "idPhoto", e)}
            />
            <Button
              type="button"
              variant="outline"
              className="flex-grow bg-white border-slate-300 hover:bg-slate-50 text-slate-700 cursor-pointer"
              onClick={() =>
                document.getElementById(`idPhoto${leaderPrefix}`)?.click()
              }
            >
              <Upload className="mr-2 h-4 w-4 text-slate-500 cursor-pointer" />
              Upload ID Photo (JPG/PNG, high quality)
              {fileNames[leaderIndex]?.idPhoto && (
                <span className="ml-2 text-sm text-green-600">
                  {fileNames[leaderIndex].idPhoto}
                </span>
              )}
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
                  {sampleFiles
                    .filter((file) => file.name === "ID Photo Sample")
                    .map((file) => (
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
                          onClick={() =>
                            window.open(file.downloadLink, "_blank")
                          }
                        >
                          <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                      </div>
                    ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    );
  };

  return (
    <SectionContainer title="Team Leaders">
      <FormField
        control={form.control}
        name="teamLeadersCount"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormLabel className="text-slate-700 font-medium">
              Number of Team Leaders
            </FormLabel>
            <FormDescription className="text-slate-500 text-sm">
              Select the number of team leaders (maximum 2)
            </FormDescription>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || "1"}
              >
                <SelectTrigger className="bg-white border-slate-300 h-11">
                  <SelectValue placeholder="Select number of team leaders" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} Team Leader{num > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="accompanyingPersons"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormLabel className="text-slate-700 font-medium">
              Total Accompanying Persons
            </FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-white border-slate-300 h-11">
                  <SelectValue placeholder="Select number (max 5)" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 6 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {Array.from({ length: leadersCount }).map((_, index) => (
        <React.Fragment key={index}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FormField
              control={form.control}
              name={index > 0 ? `leader${index}Name` : "leaderName"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Team Leader{index > 0 ? ` ${index + 1}` : ""}`s Full Name
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
              name={index > 0 ? `leader${index}Email` : "leaderEmail"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Team Leader{index > 0 ? ` ${index + 1}` : ""}`s Email
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
              name={index > 0 ? `leader${index}Phone` : "leaderPhone"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Team Leader{index > 0 ? ` ${index + 1}` : ""}`s Phone Number
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
              name={index > 0 ? `leader${index}Role` : "leaderRole"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Team Leader{index > 0 ? ` ${index + 1}` : ""}`s Role
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-white border-slate-300 h-11">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Informatics">Informatics</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {renderFileUploadSection(index)}
        </React.Fragment>
      ))}
    </SectionContainer>
  );
}
