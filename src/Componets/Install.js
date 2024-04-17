// import React, { useState } from "react";

// const InstallButton = () => {
//   const [deferredPrompt, setDeferredPrompt] = useState(null);

//   const handleInstall = () => {
//     if (deferredPrompt) {
//       deferredPrompt.prompt();

//       deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === "accepted") {
//           console.log("User accepted the install prompt");
//         } else {
//           console.log("User dismissed the install prompt");
//         }
//         setDeferredPrompt(null);
//       });
//     }
//   };

//   const handleBeforeInstallPrompt = (event) => {
//     event.preventDefault();
//     setDeferredPrompt(event);
//   };

//   React.useEffect(() => {
//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
//     return () => {
//       window.removeEventListener(
//         "beforeinstallprompt",
//         handleBeforeInstallPrompt
//       );
//     };
//   }, []);

//   return <button onClick={handleInstall}>Install App</button>;
// // return
// };

// export default InstallButton;

import { IconBrandAndroid } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";

const InstallButton = () => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setShowInstallPrompt(true);
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
          window.location.reload();
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  useEffect(() => {
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    if (isStandalone) {
      // Redirect logic here
      console.log("App is installed");
    }
  }, []);

  return (
    <div>
     
      {showInstallPrompt && (
        <button
          className="btn btn-primary d-flex align-items-center px-3 gap-6"
          id="add-notes"
          onClick={handleInstallClick}
        >
          <IconBrandAndroid stroke={2} height={20} width={20} />
          <span className="d-none d-md-block fw-medium fs-3">Install App</span>
        </button>
      )}
    </div>
  );
};

export default InstallButton;
