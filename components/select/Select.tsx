import React, { useState, useEffect, useRef, useCallback } from 'react';
import DownArrow from './../../icons/DownArrow';

export const Option: React.FC<{
  value: string;
  state: string | null;
  onClick: () => void;
  onSelect: () => void;
  children: React.ReactNode;
}> = ({ onClick, state, onSelect, children }) => {
  return (
    <div
      className={'option ' + state}
      onClick={() => {
        onClick();
        onSelect();
      }}
    >
      {children}
    </div>
  );
};

const Select: React.FC<{
  onSelect: (data: any) => void;
  children: React.ReactNode[];
}> = ({ onSelect , children}) => {
  const [selected, setSelected] = useState<any>();
  const options = useRef<HTMLDivElement>(null);

  console.log(children)
//   useEffect(() => {
//     setSelected({
//       content: children[0]?.props.children,
//       value: children[0]?.props.value,
//     });
//   }, []);

  const selectEvent = useCallback(
    (index:number) => () => {
        // const data = {
        //     content: children[index]?.props.children,
        //     value: children[index]?.props.value,
        //   };
        //   setSelected(data);
        //   onSelect(data);
    },
    []
  );
  const handleCollapse = () => {
    options && options?.current?.classList.toggle('collapse');
  };

  return (
    <div className="select-container">
      <div className="select">
        <div className="selected" onClick={handleCollapse}>
          {selected?.content}
        </div>
        <div className="options" ref={options}>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              const props = {
                onClick: selectEvent(index),
                onSelect: handleCollapse,
                state: "null",
              };
              child = child as React.ReactElement<any>;
              if (child.props.value === selected?.value) 
                props['state'] = 'active';

              return React.cloneElement(child, { ...props });
            }
            return child;
          })}
        </div>
        <DownArrow onClick={handleCollapse} />
      </div>
    </div>
  );
};

export default Select;