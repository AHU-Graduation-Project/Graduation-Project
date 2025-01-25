import { CustomSwitch } from './CustomSwitch';

interface SectionToggleProps {
  label: string;
  isEnabled: boolean;
  onChange: (checked: boolean) => void;
}

const SectionToggle = ({ label, isEnabled, onChange }: SectionToggleProps) => (
  <CustomSwitch
    label={label}
    isEnabled={isEnabled}
    onChange={onChange}
  />
);

export default SectionToggle;
