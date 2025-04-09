import React, { useState } from "react";
import Switch from "./Switch";

export default function SwitchContainer() {
  // state of the switch to be managed externally
  const [isOn, setIsOn] = useState(false);
  const onToggle = () => setIsOn(!isOn);
  return <Switch isOn={isOn} onToggle={onToggle} />;
}
