import { Collapse, NavLink } from "@mantine/core";
import classes from "./testCasesList.module.scss";
import { Fragment, useCallback } from "react";
import { TCase } from "../../schema";
import { StatusIcon } from "../shared/StatusIcon";
import { useNavigate, useParams } from "react-router";

interface IOwnProps {
  data: TCase[];
}

export const TestCasesList = ({ data }: IOwnProps) => {
  const { projectId, caseId, testId } = useParams();
  const navigate = useNavigate();
  const handleClick = useCallback(
    (path: string) => () => {
      navigate(path);
    },
    [navigate],
  );
  return (
    <div className={classes.cases}>
      {data.map((testCase) => (
        <Fragment key={testCase.id}>
          <NavLink
            href={"#"}
            active={testCase.id === caseId}
            label={testCase.title}
            leftSection={<StatusIcon status={testCase.caseStatus} />}
            variant="subtle"
            onClick={handleClick(
              `/project/${projectId}/testCase/${testCase.id}`,
            )}
          />
          {testCase.tests.length > 0 && (
            <Collapse in={caseId === testCase.id}>
              <div className={classes.tests}>
                {testCase.tests.map((test, index) => (
                  <div key={index} className={classes.item}>
                    <div className={classes.divider}></div>
                    <NavLink
                      href={"#"}
                      active={testId === test.id}
                      label={test.title}
                      leftSection={<StatusIcon status={test.testStatus} />}
                      variant="subtle"
                      onClick={handleClick(
                        `/project/${projectId}/testCase/${testCase.id}/${test.id}`,
                      )}
                    />
                  </div>
                ))}
              </div>
            </Collapse>
          )}
        </Fragment>
      ))}
    </div>
  );
};
