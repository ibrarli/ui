import { Eye2, EyeClosed } from "apen-icons";

interface InputGroupPasswordToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const InputGroupPasswordToggle = ({ isVisible, onToggle }: InputGroupPasswordToggleProps) => (
  <button
    type="button"
    onClick={onToggle}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary dark:hover:text-white transition-colors cursor-pointer p-1"
  >
    {isVisible ? <Eye2 size={18} /> : <EyeClosed size={18} />}
  </button>
);