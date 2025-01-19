import Modal from "./Modal";
import { Input } from "../../../UI/Input";
import { Button } from "../../../UI/Button";
import TextArea from "../../../UI/TextArea";

interface ExperienceModalProps {
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  setExperience: (experience: any[]) => void;
  experience: any[];
  value : string;
  onChange : (e : any) =>void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  activeModal,
  setActiveModal,
  setExperience,
  experience,
  value,
  onChange
}) => {
  return (
    <Modal
      isOpen={activeModal === 'experience'}
      onClose={() => setActiveModal(null)}
      title="Add Experience"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          setExperience([
            ...experience,
            {
              title: formData.get('title'),
              company: formData.get('company'),
              period: formData.get('period'),
              location: formData.get('location'),
              responsibilities: formData.get('responsibilities'),
            },
          ]);
          setActiveModal(null);
        }}
      >
        <Input label="Job Title" name="title" type="text" required />
        <Input label="Company Name" name="company" type="text" required />
        <Input
          label="Period"
          name="period"
          type="text"
          placeholder="Jan 2020 - Present"
          required
        />
        <Input label="Location" name="location" type="text" required />
        <TextArea
          label="Key Responsibilities"
          name="responsibilities"
          placeholder="Enter each responsibility on a new line"
          required
          value={value}
          onChange={onChange}
        />
        <Button type="submit">Add Experience</Button>
      </form>
    </Modal>
  );
};
