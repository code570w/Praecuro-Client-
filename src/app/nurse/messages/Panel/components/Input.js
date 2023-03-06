import React from 'react';
import './Input.sass';

const Input = ({icon, placeholder, type, onChange, required, value}) => {
  return (
    <div className="uk-margin-small-top">
      <div className="uk-inline uk-width-1-1">
        <span className="uk-form-icon uk-form-icon-flip" data-uk-icon={`icon: ${icon}`} onChange={onChange} />
        <input className="uk-input uk-border-pill uk-margin-remove admin" required={required} placeholder={placeholder} value={value} type={type} onChange={onChange} />
      </div>
    </div>
  );
};

export default Input;
