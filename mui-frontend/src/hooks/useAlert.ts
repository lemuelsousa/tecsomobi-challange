import { useCallback, useState } from "react";

export function useAlert(defaultDelay = 3000) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  const triggerAlert = useCallback(
    (msg: string, dealay = defaultDelay, sev: typeof severity = "success") => {
      setMessage(msg);
      setShow(true);
      setSeverity(sev);
      setTimeout(() => setShow(false), dealay);
    },
    [defaultDelay]
  );

  return { show, message, severity, triggerAlert };
}
