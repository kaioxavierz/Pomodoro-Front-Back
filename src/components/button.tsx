import { ButtonProps } from "../interfaces/button";

export function Button(props: ButtonProps): React.ReactElement {
    return (
      <button onClick={props.onclick} className={props.className}>
        {props.text}
      </button>
    );
  }
  