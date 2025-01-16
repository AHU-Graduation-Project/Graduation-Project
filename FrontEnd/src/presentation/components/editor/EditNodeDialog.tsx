import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";
import { Node } from "reactflow";
import styles from "./EditNodeDialog.module.css";
import { NodeData } from "./RoadmapEditor";

type EditNodeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  node: Node | null;
  onSave: (data: NodeData) => void;
  onDelete: () => void;
};

const EditNodeDialog = ({
  isOpen,
  onClose,
  node,
  onSave,
  onDelete,
}: EditNodeDialogProps) => {
  const [formData, setFormData] = useState<NodeData>(
    node?.data || { label: "", description: "" }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.title}>Edit Node</Dialog.Title>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="label" className={styles.label}>
                Label
              </label>
              <input
                id="label"
                className={styles.input}
                value={formData.label}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, label: e.target.value }))
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <textarea
                id="description"
                className={styles.textarea}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={onDelete}
              >
                Delete Node
              </button>
              <div className={styles.rightButtons}>
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

export default EditNodeDialog;
