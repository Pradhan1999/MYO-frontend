"use client";

import { getProjects } from "@/services/projects";
import ProjectsView from "./projects-view";
import { useEffect, useState } from "react";
export default function ProjectPage({ params }) {
  const [projects, setProjects] = useState({
    loading: true,
    records: [],
  });

  useEffect(() => {
    getProjects().then((res) => {
      setProjects({ records: res.rows || [] });
    });
  }, []);

  return (
    <div>
      <ProjectsView projects={projects} setProjects={setProjects} />
    </div>
  );
}
