import Modal from "./Modal";
import { Button } from "../../../UI/Button";
import { Input } from "../../../UI/Input";

interface Certification {
  name: string;
  organization: string;
  dateObtained: string;
}

interface CertificationModalProps {
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  certifications: Certification[];
  setCertifications: (certifications: Certification[]) => void;
}

export default function CertificationModal({activeModal, setActiveModal, certifications, setCertifications}: CertificationModalProps) {
return <Modal
  isOpen={activeModal === 'certification'}
  onClose={() => setActiveModal(null)}
  title="Add Certification"
>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const newCertification: Certification = {
        name: formData.get('name') as string,
        organization: formData.get('organization') as string,
        dateObtained: formData.get('dateObtained') as string,
      };
      setCertifications([...certifications, newCertification]);
      (e.target as HTMLFormElement).reset();
      setActiveModal(null);
    }}
  >
    <Input
      label="Certification Name"
      name="name"
      type="text"
      placeholder="e.g., AWS Certified Solutions Architect"
      required
    />
    <Input
      label="Issuing Organization"
      name="organization"
      type="text"
      placeholder="e.g., Amazon Web Services"
      required
    />
    <Input label="Date Obtained" name="dateObtained" type="date" required />
    <Button type="submit">Add Certification</Button>
  </form>
</Modal>
}