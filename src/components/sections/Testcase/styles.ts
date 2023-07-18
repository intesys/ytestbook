import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  testcase_detail: {},
  testcase_detail__header: {
    paddingBottom: `calc(${theme.spacing.xs} * 2)`,
    marginBottom: `calc(${theme.spacing.md} * 2)`,
    borderBottom: `1px solid ${theme.colors.primary[0]}`,
  },
  testcase_detail__header_first: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  testcase_detail__header_second: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  testcase_detail__body: {},
  testcase_detail__body_desc: {
    marginBottom: `calc(${theme.spacing.sm} * 2)`,
  },
  testcase_detail__body_req: {},
  testcase_detail__test: { marginTop: `calc(${theme.spacing.lg} * 2)` },
}));

export default useStyles;
