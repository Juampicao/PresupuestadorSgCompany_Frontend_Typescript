
interface Props {
  img: string,
  label: string,
  [x: string]: any;

}
const FormContainerChild = ({ img, label, ...props  }: Props) => {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <img src={img} alt="imagen" className="img-icon " />
        <label { ...props }> {label}</label>
      </div>
    </>
  );
};

export default FormContainerChild;
