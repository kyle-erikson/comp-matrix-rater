type ReportInput = {
  matrix_report_id: string;
  competency_id: string;
  user_id: string;
  rating: number;
  notes: string;
};

type Report = {
  getReports: Report;
};

type KeyAreas = {
  name: string;
  attribute: [Attributes];
};

type Attributes = {
  name: string;
  competency: [Competency];
};

type Competency = {
  id: number;
  name: string;
  competency_description: CompetencyDescription;
  rating: Rating;
};

type CompetencyDescription = {
  core: Boolean;
  description: string;
};

type Rating = {
  id: number;
  competency_id: number;
  user_id: number;
  rating: number;
  notes: string;
  matrix_report_id: string;
};

export { ReportInput, Report };
