import Slider1 from "../../assets/Images/Slider1.png"
import Slider2 from "../../assets/Images/Slider2.png"

export const newCollection =[
  {
    aboutImg:Slider1,
    offer:"Upto 30% Off",
    title:"iPad air",
  },
  {
    aboutImg:Slider2,
    offer:"Upto 30% Off",
    title:"Live Without Limits",
  }
]

export default function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return <div ref={wrapperRef}>{props.children}</div>;
}