export type GeneratedChart = {
  id: string;
  file: string;
  title: string;
};

export type GeneratedManifest = {
  generatedAt: string;
  sourceFiles: { matlab: string; excel: string };
  matlab: GeneratedChart[];
  excel: GeneratedChart[];
};

export const MATLAB_BASE = '/generated/matlab';
export const EXCEL_BASE = '/generated/excel';

export function chartUrl(base: string, file: string) {
  return `${base}/${file}`;
}
