interface Props {
  play: boolean;
  label: string;
}

const LabelView = (props: Props) => {
  const label = props.label.split("").map((text, idx) => <p>{text}</p>);

  return (
    <div className="label-wrap">
      <div className={`label ${props.play ? "play" : ""}`}>{label}</div>
    </div>
  );
};

export default LabelView;
