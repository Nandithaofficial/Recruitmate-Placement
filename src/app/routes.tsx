import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import ResumeManager from "./components/modules/ResumeManager";
import ATSScoring from "./components/modules/ATSScoring";
import StudyMaterials from "./components/modules/StudyMaterials";
import AIMockTest from "./components/modules/AIMockTest";
import AIInterview from "./components/modules/AIInterview";
import GroupDiscussion from "./components/modules/GroupDiscussion";
import CodingPlatform from "./components/modules/CodingPlatform";
import ProgressDashboard from "./components/modules/ProgressDashboard";
import ProtectedRoute from "../ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      {
        path: "dashboard",
        Component: Dashboard,
        children: [
          { path: "resume-manager", Component: ResumeManager },
          { path: "ats-scoring", Component: ATSScoring },
          { path: "study-materials", Component: StudyMaterials },
          { path: "ai-mock-test", Component: AIMockTest },
          { path: "ai-interview", Component: AIInterview },
          { path: "group-discussion", Component: GroupDiscussion },
          { path: "coding-platform", Component: CodingPlatform },
          { path: "progress", Component: ProgressDashboard },
        ],
      },
      { path: "*", Component: Home },
    ],
  },
]);
