// src/hooks/useIQSetting.js
import { useEffect } from "react";

function useIQSetting() {
  useEffect(() => {
    // Define your settings here if necessary
    const initialSettings = {
      theme_scheme_direction: "ltr", // Example setting
      theme_style_appearance: "dark"
    };

 console.log(window.IQSetting)
    // Initialize IQSetting with the initial settings
    const iqSettingInstance = new window.IQSetting(initialSettings);

    // Example: Update settings after initialization
    iqSettingInstance.afterInit(() => {
      console.log("IQSetting initialized!");
    });

    // Clean up when the component unmounts
    return () => {
      iqSettingInstance.destroy();
    };
  }, []); // Empty dependency array means it runs once when the component mounts

  return null; // Custom hook doesn't render anything
}

export default useIQSetting;
