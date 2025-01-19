import Modal from "./Modal";
import { Button } from "../../../UI/Button";
import { Input } from "../../../UI/Input";

interface SkillModalProps {
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  setPersonalInfo: (info: any) => void;
  setSkills: (skills: any[]) => void;
  skills: any[];
}

export const SkillModal: React.FC<SkillModalProps> = ({
  activeModal,
  setActiveModal,
  setPersonalInfo,
  setSkills,
  skills,
}) => {
  return (
    <>
      <Modal
        isOpen={activeModal === "personal"}
        onClose={() => setActiveModal(null)}
        title="Personal Information"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            setPersonalInfo({
              fullast_name: formData.get("fullast_name"),
              email: formData.get("email"),
              phone: formData.get("phone"),
              linkedin: formData.get("linkedin"),
            });
            setActiveModal(null);
          }}
        >
          <Input label="Full Name" name="fullast_name" type="text" required />
          <Input label="Email" name="email" type="email" required />
          <Input label="Phone" name="phone" type="tel" required />
          <Input label="LinkedIn" name="linkedin" type="text" required />
          <Button type="submit">Save</Button>
        </form>
      </Modal>

      <Modal
        isOpen={activeModal === "skills"}
        onClose={() => setActiveModal(null)}
        title="Add Skill"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const skillTitle = formData.get("skill") as string;
            if (skillTitle.trim()) {
              setSkills([...skills, { title: skillTitle }]);
              setActiveModal(null);
            }
          }}
        >
          <Input
            label="Skill Description"
            name="skill"
            type="text"
            placeholder="e.g., Programming Languages: JavaScript, Python"
            required
          />
          <Button type="submit">Add Skill</Button>
        </form>
      </Modal>
    </>
  );
};