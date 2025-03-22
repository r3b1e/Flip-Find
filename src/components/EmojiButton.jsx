import { decode } from "html-entities";

export default function EmojiButton({
  handleClick,
  emoji,
  style,
  selected,
  matched,
  index
}) {
  const btnContent = selected || matched ? decode(emoji.htmlCode[0]) : "?";
  const btnStyle = matched
    ? "btn--emoji__back--matched"
    : selected
    ? "btn--emoji__back--selected"
    : "btn--emoji__front";
  console.log(btnStyle);

  const btnAria =
        matched ? `${decode(emoji.name)}. Matched.` :
        selected ? `${decode(emoji.name)}. Not matched yet.` :
        "Card upside down."
  return (
    <button
      className={`${style} ${btnStyle}`}
      onClick={!selected ? handleClick : null}
      disabled={matched}
      aria-label={`Position ${index + 1}: ${btnAria}`}
      aria-live="polite"
    >
      {btnContent}
    </button>
  );
}
