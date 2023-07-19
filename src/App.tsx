import React, { useState, useEffect } from "react";
import axios from "axios";

type TTestcase = Array<Record<string, string>>;

const App: React.FC = () => {
  const [testbooks, setTestbooks] = useState<TTestcase>([]);
  const [testcases, setTestcases] = useState<TTestcase>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/testbook")
      .then((response) => setTestbooks(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:3000/api/testcase")
      .then((response) => setTestcases(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleOnClick_testbook = () => {
    axios
      .post("http://localhost:3000/api/testbook", { title: "testbook 1" })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const handleOnClick_testcase = () => {
    axios
      .post("http://localhost:3000/api/testcase", { title: "testcase 1" })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <button onClick={handleOnClick_testbook}>ADD TESTBOOK</button>
      <button onClick={handleOnClick_testcase}>ADD TESTBOOK</button>
      <h1>Testbook</h1>
      {testbooks?.map((item) => (
        <span style={{ margin: 10 }}>{item.title}</span>
      ))}

      <h1>Testcase</h1>
      {testcases?.map((item) => (
        <p>{item.title}</p>
      ))}
    </div>
  );
};

export default App;
