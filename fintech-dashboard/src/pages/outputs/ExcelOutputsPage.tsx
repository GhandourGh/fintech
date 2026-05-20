import { OutputsGallery } from '../../components/outputs/OutputsGallery';

export function ExcelOutputsPage() {
  return (
    <OutputsGallery
      source="excel"
      sourceLabel="DataProjScoreCard.xlsx"
      title="Excel data charts"
      description="Exploratory charts built directly from HistoricalData and ActualPortfolioData sheets: distributions, default rates by segment, and portfolio PD/EL from the workbook."
    />
  );
}
