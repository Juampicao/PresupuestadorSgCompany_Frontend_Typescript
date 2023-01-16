import useCheck from "../../hooks/useCheck";
import "./checkbox.css";


interface Props{
  value1?: string,
  value2?: string,
  onChange?: any,
  defaultChecked?: boolean,
}
const Checkbox = ({value1, value2, onChange, defaultChecked } : Props) => {
  const { isChecked, changeChecked } = useCheck();
  return (
    <div className="font-bold  ">
      {value1}
      <label className="switch switch200">
        <input
          type="checkbox"
          onChange={onChange}
          defaultChecked={defaultChecked}
        />
        <span className="slider slider200"></span>
      </label>
      {value2}
    </div>
  );
};

export default Checkbox;
