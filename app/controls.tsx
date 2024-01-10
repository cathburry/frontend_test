import Select, { SingleValue } from "react-select";
import { Options } from "./gallery";

interface ControlsProps {
  direction: Options;
  field: Options;
  filterField: (option:  SingleValue<Options> | Options) => void;
  filterDirection: (direction:  SingleValue<Options> | Options) => void;
}

const Controls: React.FC<ControlsProps> = ({
  direction,
  field,
  filterField,
  filterDirection,
}) => {
  const fieldOptions = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company.name" },
    { label: "Email", value: "email" },
  ];
  const directionOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select
          options={fieldOptions}
          value={field}
          onChange={(newVal:  SingleValue<Options> | Options) => filterField(newVal)}
          inputId="sort-field"
          className="input"
        />
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          options={directionOptions}
          value={direction}
          inputId="sort-direction"
          onChange={(newVal: SingleValue<Options> | Options) => filterDirection(newVal)}
          className="input"
        />
      </div>
    </div>
  );
};

export default Controls;
