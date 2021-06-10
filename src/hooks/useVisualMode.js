import react, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (second, replace = false) => {
    setMode(second);
    if (replace) {
      setHistory(prev => {
        return [...prev.slice(0, prev.length - 1), second]
      })
    } else {
      setHistory(prev => {
        return [...prev, second]
      })
    };
  }

  const back = () => {
    if (history.length > 1) {
      setHistory(prev => {
        setMode(prev[prev.length - 2])
        return prev.slice(0, prev.length - 1)
      })
    }
  }
  
  return { mode, transition, back };
}