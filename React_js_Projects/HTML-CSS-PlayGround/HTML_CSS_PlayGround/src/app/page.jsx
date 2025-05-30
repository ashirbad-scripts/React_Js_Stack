"use client";
import { useState, useMemo, useCallback, useEffect } from "react";

function MainComponent() {
  const defaultHtml = `<h1>Welcome</h1>\n<p>Start typing your HTML here</p>`;
  const defaultCss = `h1 {\n  color: blue;\n}`;
  const [html, setHtml] = useState(defaultHtml);
  const [css, setCss] = useState(defaultCss);
  const [error, setError] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const htmlElements = {
    Button: '<button class="button">Click me</button>',
    "Input Field": '<input type="text" placeholder="Enter text here">',
    Form: '<form>\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name">\n  <button type="submit">Submit</button>\n</form>',
    "Grid (2x2)":
      '<div class="grid">\n  <div class="grid-item">Item 1</div>\n  <div class="grid-item">Item 2</div>\n  <div class="grid-item">Item 3</div>\n  <div class="grid-item">Item 4</div>\n</div>',
    Card: '<div class="card">\n  <h2>Card Title</h2>\n  <p>Card content goes here</p>\n  <button>Learn More</button>\n</div>',
  };
  const handleElementInsert = (elementCode) => {
    setHtml(elementCode ? htmlElements[elementCode] : defaultHtml);

    if (elementCode === "Grid (2x2)") {
      setCss(
        `\n.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.grid-item {\n  padding: 1rem;\n  border: 1px solid #ccc;\n}`
      );
    } else if (elementCode === "Card") {
      setCss(
        `\n.card {\n  padding: 1rem;\n  border: 1px solid #ccc;\n  border-radius: 0.5rem;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}`
      );
    } else {
      setCss(defaultCss);
    }
  };
  const combinedContent = useMemo(() => {
    return `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>${html}</body>
    </html>
  `;
  }, [html, css]);
  const updatePreview = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const iframe = document.getElementById("preview");
      if (iframe) {
        iframe.srcdoc = combinedContent;
      }
      setPreviewContent(combinedContent);
    } catch (err) {
      setError("Failed to update preview");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [combinedContent]);
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  const handleReset = () => {
    if (window.confirm("Are you sure? This will clear your code.")) {
      setHtml(defaultHtml);
      setCss(defaultCss);
      updatePreview();
    }
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isFullScreen]);

  const htmlLines = html?.split("\n")?.length || 1;
  const cssLines = css?.split("\n")?.length || 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4 md:p-6">
      <div className="backdrop-blur-sm bg-gray-800/80 p-6 rounded-xl shadow-lg transition-all duration-500 h-[calc(100vh-2rem)] hover:shadow-2xl border border-gray-700/20">
        <h1 className="text-2xl md:text-3xl font-inter font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient">
          HTML & CSS Playground
        </h1>

        <div className="flex flex-col md:flex-row gap-6 h-[calc(100%-4rem)]">
          <div
            className={`${
              isFullScreen ? "hidden" : "w-full md:w-[60%] flex flex-col gap-6"
            }`}
          >
            <div className="flex-1 min-h-[calc((100vh-200px)/2)] relative editor-shadow rounded-xl overflow-hidden transition-all duration-300">
              <div className="flex justify-between items-center mb-2 px-4">
                <label className="block text-sm font-inter text-gray-300">
                  HTML
                </label>
                <select
                  onChange={(e) => handleElementInsert(e.target.value)}
                  className="text-sm border border-gray-600 rounded-lg px-2 py-1 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Insert Element
                  </option>
                  {Object.keys(htmlElements).map((element) => (
                    <option key={element} value={element}>
                      {element}
                    </option>
                  ))}
                </select>
              </div>
              <div className="absolute left-0 top-8 bottom-0 w-8 bg-gray-800 rounded-l-lg border-r border-gray-700 text-gray-500 text-xs font-mono pt-4 text-center select-none transition-colors duration-300">
                {Array.from({ length: htmlLines }).map((_, i) => (
                  <div key={i} className="leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="w-full h-[calc(100%-2rem)] min-h-[200px] pl-12 pr-4 py-4 font-['Fira_Code',ui-monospace,'Monaco','Consolas',monospace] leading-6 text-sm bg-gray-800 text-gray-200 rounded-lg border border-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 whitespace-pre tab-[4] transition-colors duration-300"
                spellCheck="false"
              />
            </div>
            <div className="flex-1 min-h-[calc((100vh-200px)/2)] relative editor-shadow rounded-xl overflow-hidden transition-all duration-300">
              <label className="block text-sm font-inter text-gray-300 mb-2 px-4">
                CSS
              </label>
              <div className="absolute left-0 top-8 bottom-0 w-8 bg-gray-800 rounded-l-lg border-r border-gray-700 text-gray-500 text-xs font-mono pt-4 text-center select-none transition-colors duration-300">
                {Array.from({ length: cssLines }).map((_, i) => (
                  <div key={i} className="leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                className="w-full h-[calc(100%-2rem)] min-h-[200px] pl-12 pr-4 py-4 font-['Fira_Code',ui-monospace,'Monaco','Consolas',monospace] leading-6 text-sm bg-gray-800 text-gray-200 rounded-lg border border-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 whitespace-pre tab-[4] transition-colors duration-300"
                spellCheck="false"
              />
            </div>
          </div>

          <div
            className={`${
              isFullScreen ? "w-full" : "w-full md:w-[40%]"
            } h-full flex flex-col`}
          >
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-inter text-gray-300">
                Preview
              </label>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="danger-button inline-flex items-center px-3 py-2 border border-red-800 rounded-lg text-sm font-inter text-red-400"
                >
                  <i className="fas fa-trash-alt mr-2"></i>
                  Reset
                </button>
                <button
                  onClick={updatePreview}
                  disabled={loading}
                  className="primary-button inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-inter text-white"
                >
                  <i
                    className={`fas fa-play mr-2 ${
                      loading ? "animate-spin" : ""
                    }`}
                  ></i>
                  {loading ? "Updating..." : "Update Preview"}
                </button>
                <button
                  onClick={toggleFullScreen}
                  className="secondary-button inline-flex items-center px-3 py-2 border border-gray-600 rounded-lg text-sm font-inter text-gray-300"
                >
                  <i
                    className={`fas ${
                      isFullScreen ? "fa-compress" : "fa-expand"
                    } mr-2`}
                  ></i>
                  {isFullScreen ? "Exit Full Screen" : "Full Screen"}
                </button>
              </div>
            </div>

            {error ? (
              <div className="bg-red-900/50 p-4 rounded-lg text-red-400">
                {error}
              </div>
            ) : (
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isFullScreen
                    ? "fixed inset-4 bg-gray-800"
                    : "flex-1 bg-gray-800"
                } rounded-xl border border-gray-700 relative shadow-lg hover:shadow-xl editor-shadow`}
              >
                {isFullScreen && (
                  <div className="absolute top-4 right-4 bg-black/75 text-gray-300 text-sm py-1 px-3 rounded-md font-inter backdrop-blur-sm">
                    Press ESC to exit
                  </div>
                )}
                <iframe
                  id="preview"
                  title="Preview"
                  className={`w-full h-full rounded-xl bg-white transition-colors duration-300`}
                  sandbox="allow-scripts"
                  srcDoc={previewContent}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .editor-shadow {
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          backdrop-filter: blur(8px);
          background: rgba(31,41,55,0.95);
          border: 1px solid rgba(75,85,99,0.2);
        }
        .primary-button {
          background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #06b6d4 100%);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0);
          box-shadow: 0 4px 15px rgba(236,72,153,0.3);
        }
        .primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(139,92,246,0.4);
          background: linear-gradient(135deg, #f472b6 0%, #a78bfa 50%, #22d3ee 100%);
        }
        .primary-button:active {
          transform: translateY(1px);
        }
        .primary-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        .secondary-button {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0);
          background: rgba(31,41,55,0.8);
          backdrop-filter: blur(4px);
        }
        .secondary-button:hover {
          transform: translateY(-2px);
          background: rgba(31,41,55,0.95);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .secondary-button:active {
          transform: translateY(1px);
        }
        .danger-button {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0);
          background: rgba(31,41,55,0.8);
          backdrop-filter: blur(4px);
        }
        .danger-button:hover {
          transform: translateY(-2px);
          background: rgba(185,28,28,0.2);
          box-shadow: 0 4px 15px rgba(185,28,28,0.2);
        }
        .danger-button:active {
          transform: translateY(1px);
        }
        @keyframes pulse {
          0% { transform: scale(1) translateY(-2px); }
          50% { transform: scale(1.02) translateY(-3px); }
          100% { transform: scale(1) translateY(-2px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        .primary-button:active {
          animation: pulse 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        textarea:focus {
          animation: glow 1.5s ease-in-out infinite alternate;
        }
        @keyframes glow {
          from {
            box-shadow: 0 0 5px rgba(236,72,153,0.2),
                        0 0 10px rgba(139,92,246,0.2),
                        0 0 15px rgba(6,182,212,0.2);
          }
          to {
            box-shadow: 0 0 10px rgba(236,72,153,0.3),
                        0 0 20px rgba(139,92,246,0.3),
                        0 0 30px rgba(6,182,212,0.3);
          }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;