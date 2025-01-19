import { Button } from "../../../UI/Button";
import Modal from "./Modal";
import { Input } from "../../../UI/Input";

interface EducationModalProps {
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  education: any[];
  setEducation: (education: any[]) => void;
}

export const EducationModal = ({
  activeModal,
  setActiveModal,
  education,
  setEducation,
}: EducationModalProps) => {
  return (
    <Modal
      isOpen={activeModal === "education"}
      onClose={() => setActiveModal(null)}
      title="Add Education"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          setEducation([
            ...education,
            {
              degree: formData.get("degree"),
              institution: formData.get("institution"),
              years: formData.get("years"),
            },
          ]);
          setActiveModal(null);
        }}
      >
        <Input label="Degree" name="degree" type="text" required />
        <Input
          label="Institution"
          name="institution"
          type="text"
          required
        />
        <Input
          label="Period"
          name="years"
          type="text"
          placeholder="2013 - 2017"
          required
        />
        <Button type="submit">Add Education</Button>
      </form>
    </Modal>
  );
};