import React from 'react';

interface Props {
  id: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  label?: string;
}

export const Checkbox: React.FC<Props> = props => {
  const { id, onChange, disabled, checked } = props;
  const [check, setCheck] = React.useState(checked);
  const HandleOnChange = () => {
    setCheck(!check);
    onChange();
  };

  return (
    <>
      <div className="checkbox">
        <input
          id={id}
          type="checkbox"
          checked={check}
          onChange={HandleOnChange}
          disabled={disabled}
        />
        <label htmlFor={id}>
          <svg viewBox="0,0,50,50">
            <path d="M5 30 L 20 45 L 45 5"></path>
          </svg>
        </label>
      </div>
    </>
  );
};
