import { useState } from "react";
import "./App.css";
import TestScreen from "./components/TestScreen";

function App() {
  const [isTestRunning, setIsTestRunning] = useState(false);
  return (
    <div className="bg-neutral-900">
      <TestScreen
        isTestRunning={isTestRunning}
        setIsTestRunning={setIsTestRunning}
        question="The sun rose over the quiet town. Birds sang in the trees as people woke up and started their day. It was going to be a warm and sunny morning."
      />
    </div>
  );
}

export default App;
