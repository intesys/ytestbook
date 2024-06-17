import { Collapse, NavLink } from "@mantine/core";
import classes from "./testCasesList.module.scss";
import { Fragment, useCallback } from "react";
import { TCase } from "../../schema";
import { useNavigate, useParams } from "react-router";
import { StatusIcon } from "../statusIcon/StatusIcon";

interface IOwnProps {
  data: TCase[];
  activeCaseId: string;
  activeTestId: string;
}

export const TestCasesList = ({
  data,
  activeCaseId,
  activeTestId,
}: IOwnProps) => {
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
            leftSection={<StatusIcon status={testCase.status} />}
            variant="subtle"
            c={activeCaseId === testCase.id ? "primary" : "black"}
            fw={activeCaseId === testCase.id ? "bold" : "normal"}
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
                      leftSection={<StatusIcon status={test.status} />}
                      variant="subtle"
                      c={activeTestId === test.id ? "primary" : "black"}
                      fw={activeTestId === test.id ? "bold" : "normal"}
                      onClick={handleClick(
                        `/project/${projectId}/testCase/${testCase.id}/test/${test.id}`,
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
