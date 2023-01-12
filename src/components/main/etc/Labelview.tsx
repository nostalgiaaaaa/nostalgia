interface Props {
  play: boolean;
  label: string;
}

const LabelView = (props: Props) => {
  const label = props.label
    .split("")
    .map((text, idx) => <p key={idx}>{text}</p>);

  return (
    <div className="label-wrap">
      <div
        style={{
          width: props.play
            ? `${props.label.length * 8}%`
            : `${props.label.length * 6}%`,
        }}
        className={`label ${props.play ? "play" : ""}`}
      >
        {label}
      </div>
    </div>
  );
};

export default LabelView;
