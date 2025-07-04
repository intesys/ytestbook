import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { DetailSection } from "./components/detailSection/DetailSection";
import { Empty } from "./components/empty/Empty";
import { NotFound } from "./components/notFound/NotFound";
import { Project } from "./components/project/Project";
import { Repositories } from "./components/repositories/Repositories";
import { Server } from "./components/server/Server";
import { Settings } from "./components/settings/Settings";
import { TestCase } from "./components/testCase/TestCase";
import { Reports } from "./components/reports/Reports";

export const MainNavigation: React.FC = () => (
  <Routes>
    <Route path="/" element={<Repositories />} />
    <Route path="/server/:serverName" element={<Server />}>
      <Route path="project/:projectId" element={<Project />}>
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="empty" element={<Empty />} />
        <Route path="testCase/:caseId" element={<Outlet />}>
          <Route index element={<TestCase />} />
          <Route path="test/:testId" element={<DetailSection />}>
            <Route path="step/:stepId" element={<DetailSection />} />
          </Route>
        </Route>
        <Route index element={<Reports />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);
