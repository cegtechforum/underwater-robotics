import { projectData } from "@/constants/Round1/projectData";

const ProjectContent = ({ projectType }) => {
  const projectConfig = projectData[projectType];

  if (!projectConfig) return null;

  const { bgColor, borderColor, textColor, content } = projectConfig;

  return (
    <div
      className={`w-full max-w-4xl mx-auto p-6 ${bgColor} border-t-4 ${borderColor} rounded-lg shadow-lg mt-8`}
    >
      <h2 className={`text-2xl font-semibold text-center ${textColor} mb-4`}>Guidelines</h2>
      <p className="text-lg text-gray-700 font-semibold text-justify">{content}</p>
    </div>
  );
};

export default ProjectContent;
