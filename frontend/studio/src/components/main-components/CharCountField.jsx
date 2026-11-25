import { useLayoutEffect, useRef } from "react";

// Controlled <input>/<textarea> with a "12/90" counter.
// The counter is derived from `value`, so there is no second piece of state to keep in sync.
const CharCountField = ({
  value = "",
  onChange,
  maxCharCount,
  multiline = false,
  autoGrow = false,
  className,
  counterClassName,
  wrapperClassName,
  hideCounter = false,
  ...fieldProps
}) => {
  const textareaRef = useRef(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!autoGrow || !textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value, autoGrow]);

  const sharedProps = {
    ...fieldProps,
    className,
    value,
    maxLength: maxCharCount,
    onChange: (e) => onChange(e.target.value),
  };

  const field = multiline ? (
    <textarea ref={textareaRef} {...sharedProps} />
  ) : (
    <input type="text" {...sharedProps} />
  );
  const counter = hideCounter ? null : (
    <CharCounter value={value} max={maxCharCount} className={counterClassName} />
  );

  return wrapperClassName ? (
    <div className={wrapperClassName}>
      {field}
      {counter}
    </div>
  ) : (
    <>
      {field}
      {counter}
    </>
  );
};

export const CharCounter = ({ value = "", max, className }) => (
  <span className={className}>
    {value.length}/{max}
  </span>
);

export default CharCountField;
