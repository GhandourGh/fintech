import { OutputsGallery } from '../../components/outputs/OutputsGallery';

export function MatlabOutputsPage() {
  return (
    <OutputsGallery
      source="matlab"
      sourceLabel="FinTech_Scorecard_Project.m"
      title="MATLAB script charts"
      description="Figures aligned with FinTech_Scorecard_Project.m: default distribution, plotbins (WOE), ROC validation, portfolio scores, PD, expected loss, pricing, and decision summaries. Values match your scorecard workflow outputs."
    />
  );
}
