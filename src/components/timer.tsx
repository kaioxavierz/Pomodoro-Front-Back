import { secondsToMinutes } from "../utils/seconds-to-time";

type Props = {
    mainTime: number
  };
  
export function Timer(props: Props): React.ReactElement {
      return <div className="timer">{secondsToMinutes(props.mainTime)}</div>
  }
  