export default function Button({ onClick }) {
  return (
    <div className="BtnContainer">
      <div className="Button" onClick={onClick}>
        Button
      </div>
    </div>
  );
}
