(function () {
  "use strict";

  // Customizer Setting initialize
  let setting_options = document.querySelector('meta[name="setting_options"]');
  if (setting_options !== null && setting_options !== undefined) {
    setting_options = JSON.parse(setting_options.getAttribute("content"));
  } else {
    setting_options = {};
  }

  // Check if IQSetting is defined
  if (typeof IQSetting !== "undefined") {
    window.IQSetting = new IQSetting(setting_options);
  } else {
    console.error("IQSetting is not defined. Please include the required script before this script.");
  }

  // Handle live customizer panel
  document.addEventListener("click", function (e) {
    const liveCustomizerPannel = document.querySelector("#live-customizer");
    if (liveCustomizerPannel !== null) {
      if (liveCustomizerPannel.classList.contains("show")) {
        if (
          e.target.closest(".live-customizer") == null &&
          e.target.closest("#settingbutton") == null
        ) {
          bootstrap.Offcanvas.getInstance(liveCustomizerPannel).hide();
        }
      }
    }
  });
  {console.log(window.IQSetting)}

  // Reset Settings
  const resetSettings = document.querySelector('[data-reset="settings"]');
  if (resetSettings !== null) {
    resetSettings.addEventListener("click", (e) => {
      e.preventDefault();
      const confirm = window.confirm(
        "Are you sure you want to reset your settings?"
      );
      if (confirm && typeof window.IQSetting !== "undefined") {
        window.IQSetting.reInit();
      }
    });
  }
})();
