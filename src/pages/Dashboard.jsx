import React, { useState } from "react";

import ProjectForm from "../components/ProjectForm";
import CabinetSelector from "../components/CabinetSelector";
import CountertopSelector from "../components/CountertopSelector";
import ApplianceCatalog from "../components/ApplianceCatalog";
import FlooringCalculator from "../components/FlooringCalculator";
import PlumbingSelector from "../components/PlumbingSelector";
import LightingSelector from "../components/LightingSelector";
import CostBreakdown from "../components/CostBreakdown";
import SummaryReport from "../components/SummaryReport";
import ApprovalPanel from "../components/ApprovalPanel";

export default function Dashboard() {
  const [project, setProject] = useState(null);
  const [components, setComponents] = useState([]);

  // Unified handler for all components
  const addComponent = (comp) => {
    if (!comp) return;
    setComponents((prev) => [...prev, comp]);
  };

  return (
    <div className="container py-3">
      {/* Step 1: Create Project */}
      {!project && (
        <ProjectForm onSubmit={setProject} />
      )}

      {/* Step 2: Add components if project exists */}
      {project && (
        <>
          <div className="alert alert-secondary">
            <strong>Project:</strong> {project.name} |{" "}
            <strong>Location:</strong> {project.location} |{" "}
            <strong>Size:</strong> {project.dimensions} sq.ft
          </div>

          {/* Selection Modules */}
          <CabinetSelector onSelect={addComponent} />
          <CountertopSelector onSelect={addComponent} />
          <ApplianceCatalog onSelect={addComponent} />
          <FlooringCalculator onSelect={addComponent} />
          <PlumbingSelector onSelect={addComponent} />
          <LightingSelector onSelect={addComponent} />

          {/* Costing + Summary */}
          <CostBreakdown components={components} />
          <SummaryReport project={project} components={components} />

          {/* Approval Section */}
          <ApprovalPanel project={project} components={components} />
        </>
      )}
    </div>
  );
}
