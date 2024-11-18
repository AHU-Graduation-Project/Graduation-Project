import styles from "./divider.module.scss"; // Import the CSS module

interface DividerTextProps {
  text?: string;
}

export default function DividerText({ text = "" }: DividerTextProps) {
  return (
    <div className={styles.container}>
      <div className={styles.divider}>{text}</div>
    </div>
  );
}
