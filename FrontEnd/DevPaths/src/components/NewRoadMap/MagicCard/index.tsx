import React, { useRef } from "react";
import style from "./magiccard.module.scss";

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MagicCard({ children, className }: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={cardRef} className={`${style.magic_card} ${className}`}>
      <div className={style.content}>{children}</div>
    </div>
  );
}
