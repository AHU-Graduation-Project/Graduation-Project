import { useState, useRef, useEffect } from "react";
import { Edit, Code, Map, Plus, Brain, Library } from "lucide-react";
import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  ListsToggle,
  InsertTable,
  InsertThematicBreak,
  InsertFrontmatter,
  Separator,
} from "@mdxeditor/editor";
import { useNavigate } from "react-router-dom";
import "@mdxeditor/editor/style.css";

const AddRoadmapModal = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [route, setRoute] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [routeError, setRouteError] = useState("");
  const [isCheckingRoute, setIsCheckingRoute] = useState(false);
  const [selectedIconIndex, setSelectedIconIndex] = useState(null);
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const icons = [Edit, Code, Map, Plus, Brain, Library];
  const baseUrl = "http://devpath/#/roadmaps/";

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!route) {
      setRouteError("");
      setIsCheckingRoute(false);
      return;
    }

    setIsCheckingRoute(true);

    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(`/api/check-route?route=${route}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to check route");
        }

        if (data.exists) {
          setRouteError("This route is already taken");
        } else {
          setRouteError("");
        }
      } catch (error) {
        setRouteError("Error checking route availability");
        console.error("Route check error:", error);
      } finally {
        setIsCheckingRoute(false);
      }
    }, 3000); // 2 second delay

    return () => clearTimeout(timeoutId);
  }, [route]);

  const handleIconSelect = (icon, index) => {
    setSelectedIcon(icon);
    setSelectedIconIndex(index);
  };

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!title || !route || !selectedIcon) {
      return;
    }

    if (routeError) {
      return;
    }

    // onAdd({
    //   title,
    //   route,
    //   description,
    //   icon: selectedIcon,
    // });

    setTitle("");
    setRoute("");
    setDescription("");
    setSelectedIcon(null);
    setSelectedIconIndex(null);
    onClose();
    navigate("/editor");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-xl p-6"
      >
        <h2 className="text-xl font-bold mb-4 text-theme dark:text-white">
          Add New Roadmap
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            className="mt-1 border block p-1 w-full rounded-md bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Route
          </label>
          <div className="flex p-1 border items-center rounded-md bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 dark:text-white shadow-sm">
            <span className="text-gray-700 dark:text-gray-400 text-sm">
              {baseUrl}
            </span>
            <input
              type="text"
              className="p-1 flex-1 text-sm block bg-transparent text-gray-700 dark:text-gray-200 focus:outline-none"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
            />
          </div>
          {isCheckingRoute && (
            <p className="mt-1 text-sm text-gray-500">
              Checking route availability...
            </p>
          )}
          {routeError && (
            <div className="mt-2 p-3 rounded-md bg-red-50 text-red-900 border border-red-200">
              {routeError}
            </div>
          )}
        </div>

        <div className="mb-4  ">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <MDXEditor
            markdown={description}
            // .rich-editor .editable  {color white}
            contentEditableClassName="text-gray-700 dark:text-gray-300"
            className="h-80 overflow-y-scroll bg-white dark:bg-slate-800  "
            onChange={setDescription}
            plugins={[
              toolbarPlugin({
                toolbarClassName: " ",
                toolbarContents: () => (
                  <>
                    <UndoRedo />
                    <Separator />
                    <BoldItalicUnderlineToggles />
                    <Separator />
                    <BlockTypeSelect />
                    <CodeToggle /> <CreateLink />
                    <Separator /> <ListsToggle />
                    <InsertTable />
                    <InsertThematicBreak />
                    <Separator /> <InsertFrontmatter />
                  </>
                ),
              }),
            ]}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Icon
          </label>
          <div className="flex space-x-2">
            {icons.map((Icon, index) => (
              <button
                key={index}
                onClick={() => handleIconSelect(Icon, index)}
                className={`p-2 border rounded-md shadow-sm transition-all duration-200 
                  ${
                    selectedIconIndex === index
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900 scale-110"
                      : "border-gray-300 dark:border-gray-600 hover:border-indigo-300 hover:scale-105"
                  }`}
              >
                <Icon
                  className={`w-6 h-6 ${
                    selectedIconIndex === index
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-700 dark:text-gray-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={handleAdd}
            disabled={
              !title ||
              !route ||
              !description ||
              !selectedIcon ||
              !!routeError ||
              isCheckingRoute
            }
          >
            Add Roadmap
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoadmapModal;
