import { useEffect, useState } from "react";
import { findTestbook, saveTestbook } from "../api/models/testbook";
import { TestbookInfo } from "../types/pouchDB";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export const useTestbook = (slug: string) => {
  const [testbook, setTestbook] = useState<TestbookInfo & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta>();
  const navigate = useNavigate();

  useEffect(() => {
    findTestbook(slug).then(setTestbook).catch((err) => {
      if (err.message === "missing") {
        notifications.show({
          id: "testbook_not_found",
          title: "Testbook not found",
          message: "Please select a valid testbook or create a new one"
        })
      } else {
        notifications.show({
          id: "error",
          title: "An error occurred",
          message: "Please select a valid testbook or create a new one"
        })
      }
      navigate('/');
    });
  }, [slug]);

  const save = async (testbook: TestbookInfo) => {
    saveTestbook(testbook)
      .then(setTestbook)
      .catch(err => notifications.show({
        id: "error_testbook_save",
        title: "Error saving testbook",
        message: err
      }));
  }

  return [testbook, save];
}