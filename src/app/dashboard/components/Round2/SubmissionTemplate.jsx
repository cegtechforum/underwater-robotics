import { Button } from "@/components/ui/button";
import { Download, FileCheck } from "lucide-react";

export function SubmissionTemplate() {
    return (
      <div className="bg-white border-2 border-dashed border-yellow-200 p-4 md:p-6 rounded-lg space-y-4 hover:border-yellow-300 transition-all duration-300 mt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-3 md:space-y-0">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center">
            <FileCheck className="mr-2 h-5 w-5 md:h-6 md:w-6" />
            Submission Template
          </h2>
          <Button
            variant="outline"
            className="w-full md:w-auto border-yellow-500 hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center"
            asChild
          >
            <a
              href="/templates/Round2.docx"
              download="Round1Template.docx"
            >
              <Download className="mr-2 h-4 w-4" />
              <span className="text-sm md:text-base">
                Download Template
              </span>
            </a>
          </Button>
        </div>
        <p className="text-sm md:text-base text-gray-600 text-center md:text-left">
          Please ensure you strictly follow the submission template format before uploading your file.
        </p>
      </div>
    );
  }
  