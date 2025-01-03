import { FileText, ExternalLink } from "lucide-react";
import ReactHtmlParser from 'react-html-parser';

export function CourseNotes({
  courseChapterText,
}: {
  courseChapterText: string;
}) {
  const whiteboardResources = [
    {
      title: "Lecture 1 Whiteboard Notes",
      date: "2024-03-10",
      link: "#",
    },
    {
      title: "Problem Solving Session",
      date: "2024-03-12",
      link: "#",
    },
    {
      title: "Project Planning Diagram",
      date: "2024-03-15",
      link: "#",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 pt-0">
        <div
          className="mt-4 prose prose-sm max-w-none"
        >{ReactHtmlParser(courseChapterText)}</div>
      </div>

      {/* Whiteboard Resources */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Whiteboard Resources</h3>
        <div className="space-y-4">
          {whiteboardResources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-900 hover:bg-blue-50/50 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-white transition-colors">
                  <FileText className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {resource.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Created on {new Date(resource.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
