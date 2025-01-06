import { projectData } from "@/constants/Round2/projectData";
import { SubmissionTemplate } from "./SubmissionTemplate";

const ProjectContent = ({ projectType }) => {
  const projectConfig = projectData[projectType];

  if (!projectConfig) return null;

  const { bgColor, borderColor, textColor, content } = projectConfig;

  return (
    <div
      className={`w-full max-w-4xl mx-auto p-6 ${bgColor} border-t-4 ${borderColor} rounded-lg shadow-lg mt-8`}
    >
      <h2 className={`text-2xl font-semibold text-center ${textColor} mb-4`}>Guidelines</h2>
      <ul className="text-lg text-gray-700 font-semibold text-justify list-disc list-inside">
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {projectType === "PROJECT_PROPOSAL" && <SubmissionTemplate />}
    </div>
  );
};

export default ProjectContent;
