import { useEffect, useState } from "react";

function UploadWidget({ uwConfig, setState }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.getElementById("cloudinary-upload-widget-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.setAttribute("async", "");
      script.setAttribute("id", "cloudinary-upload-widget-script");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.addEventListener("load", () => {
        setLoaded(true);
      });
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  const handleUpload = () => {
    if (loaded && window.cloudinary) {
      const widget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Upload Success! URL: ", result.info.secure_url);
            setState((prev) => [...prev, result.info.secure_url]);
          }
        }
      );
      widget.open();
    } else {
      console.error("Cloudinary script not loaded yet.");
    }
  };

  return (
    <button
      type="button"
      className="cloudinary-button"
      onClick={handleUpload}
      style={{
        padding: "10px 20px",
        backgroundColor: "#f7c14b",
        border: "none",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        borderRadius: "5px",
        marginTop: "10px",
      }}
    >
      Upload Image
    </button>
  );
}

export default UploadWidget;
