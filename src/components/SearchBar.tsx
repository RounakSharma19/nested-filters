import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "../utils";
import "./SearchBar.css";

type IProps = {
  /*Placeholder for search */
  placeholder?: string;

  /*Callback function for passing value to parent */
  onChange: (value: string) => void;

  /*Callback function for clearing searched state */
  onCancel: () => void;

  /*Background color for search box */
  background?: string;

  /*Text color for placeholder text */
  placeholderTextColor?: string;
  padding?: string;
};

type ForwardedFunction = {
  clear: () => void;
};

const SearchBar: React.ForwardRefRenderFunction<ForwardedFunction, IProps> = (
  props: IProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reference?: any
): JSX.Element => {
  const {
    placeholder = "",
    onCancel,
    onChange,
    background = "bg-white",
    placeholderTextColor = "text-placeholder-secondary",
  } = props;
  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = debounce(() => {
    onChange(ref.current!.value);
  }, 500);

  const handleCancel = useCallback(() => {
    if (ref.current) {
      ref.current.value = "";
    }
    onCancel();
  }, [onCancel]);

  useImperativeHandle(
    reference,
    () => ({
      clear: () => {
        handleCancel();
      },
      alert: () => {
        alert("You triggered this ");
      },
      set: (value: string) => {
        ref.current!.value = value;
      },
    }),
    [handleCancel]
  );

  return (
    <div className={`search-bar ${background}`}>
      <div className="icon-container">
        <FontAwesomeIcon icon={faSearch} onClick={handleCancel} />
      </div>
      <div className="input-container">
        <input
          ref={ref}
          onChange={handleChange}
          placeholder={placeholder.length > 0 ? placeholder : "search..."}
          className={`input ${background} placeholder:${placeholderTextColor}`}
          type="text"
        />
      </div>
      <div className="icon-container">
        <FontAwesomeIcon icon={faTimes} onClick={handleCancel} />
      </div>
    </div>
  );
};

export default forwardRef(SearchBar);
