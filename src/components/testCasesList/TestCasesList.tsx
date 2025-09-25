import { Fragment } from "react";
import classes from "./testCasesList.module.scss";
import { useNavigate, useParams } from "react-router";
import { Collapse, NavLink } from "@mantine/core";
import { StatusIcon } from "@/components/statusIcon/StatusIcon";
import { routesHelper } from "@/lib/helpers/routesHelper";
import { useServerName } from "@/lib/helpers/useServerName";
import { TCase } from "@/types/schema";

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
  const serverName = useServerName();
  const handleClick = (path: string) => () => {
    navigate(path);
  };
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
              routesHelper.testCaseDetail(
                serverName,
                projectId ?? "",
                testCase.id
              )
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
                        routesHelper.testDetail(
                          serverName,
                          projectId ?? "",
                          testCase.id,
                          test.id
                        )
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
