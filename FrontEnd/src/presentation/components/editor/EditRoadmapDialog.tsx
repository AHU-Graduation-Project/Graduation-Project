import * as Dialog from "@radix-ui/react-dialog";
import { X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import styles from "./EditRoadmapDialog.module.css";
import { RoadmapData } from "./RoadmapEditor";
import {BookOpen , Video , Globe} from "lucide-react";

const iconMap = {
  "Book": BookOpen,
  "Video": Video,
  "Link": Globe
} as const;

type IconType = keyof typeof iconMap;

type Resource = {
  label: string;
  description: string;
  icon: IconType;
  url: string;
};

type EditRoadmapDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  roadmapData: RoadmapData;
  onSave: (data: RoadmapData) => void;
};

const EditRoadmapDialog = ({
  isOpen,
  onClose,
  roadmapData,
  onSave,
}: EditRoadmapDialogProps) => {
  const [formData, setFormData] = useState({
    ...roadmapData,
    resources: roadmapData.resources || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addResource = () => {
    setFormData((prev) => ({
      ...prev,
      resources: [
        ...prev.resources,
        { label: "", description: "", icon: "Book", url: "" },
      ],
    }));
  };

  const removeResource = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index),
    }));
  };

  const updateResource = (index: number, field: keyof Resource, value: string) => {
    setFormData((prev) => ({
      ...prev,
      resources: prev.resources.map((resource, i) =>
        i === index ? { ...resource, [field]: value } : resource
      ),
    }));
  };

  

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.title}>Edit Roadmap</Dialog.Title>

          <form onSubmit={handleSubmit}>
            <div className={styles.formContainer}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Title</label>
                <input
                  className={styles.input}
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  title="Roadmap Title"
                  placeholder="Enter roadmap title"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Description</label>
                <textarea
                  className={styles.textarea}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  title="Roadmap Description"
                  placeholder="Enter a description for your roadmap"
                />
              </div>

              <div className={styles.formGroup}>
                <div className="flex items-center justify-between mb-4">
                  <label className={styles.label}>Resources</label>
                  <button
                    type="button"
                    onClick={addResource}
                    className="flex items-center gap-2 px-3 py-1 rounded-lg bg-theme text-white hover:opacity-90 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Resource
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.resources.map((resource, index) => (
                    <div key={index} className={styles.resourceCard}>
                      <div className={styles.resourceHeader}>
                        <div className={styles.resourceGrid}>
                          <div>
                            <label className={styles.label}>Label</label>
                            <input
                              className={styles.input}
                              value={resource.label}
                              onChange={(e) =>
                                updateResource(index, "label", e.target.value)
                              }
                              placeholder="Resource name"
                            />
                          </div>
                          <div>
                            <label className={styles.label}>Icon</label>
                            <select
                              className={styles.input}
                              value={resource.icon}
                              title="Select icon"
                              onChange={(e) =>
                                updateResource(index, "icon", e.target.value as IconType)
                              }
                            >
                              {Object.keys(iconMap).map((iconName) => (
                                <option key={iconName} value={iconName}>
                                  {iconName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeResource(index)}
                          className={styles.deleteButton}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <label className={styles.label}>Description</label>
                        <input
                          className={styles.input}
                          value={resource.description}
                          onChange={(e) =>
                            updateResource(index, "description", e.target.value)
                          }
                          placeholder="Brief description of the resource"
                        />
                      </div>

                      <div>
                        <label className={styles.label}>URL</label>
                        <input
                          className={styles.input}
                          value={resource.url}
                          onChange={(e) =>
                            updateResource(index, "url", e.target.value)
                          }
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className={styles.saveButton}>
                Save Changes
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button className={styles.closeButton} aria-label="Close dialog">
              <X size={18} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditRoadmapDialog;