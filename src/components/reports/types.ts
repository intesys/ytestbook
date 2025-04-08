export const ReportTypes = {
  Plain: "plain",
  ByTag: "byTag",
} as const;

// type TReportTypes = keyof typeof ReportTypes;

export type TReportTypes = (typeof ReportTypes)[keyof typeof ReportTypes];
