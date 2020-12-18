/* eslint-disable */
import React from 'react'
import {Helpers, Base} from 'utils'

const Input = ({
  error,
  placeholder,
  onBlur,
  onChange,
  disabled,
  type,
  value,
  className,
  id,
}) => (
  <div className={Helpers.mergeCss(Base.alignItemsCenter, Base.dFlex)}>
    <input
      id={id}
      type={type}
      onChange={onChange}
      disabled={disabled}
      defaultValue={value}
      className={className ? Helpers.mergeCss(className, Base.formControl) : Base.formControl}
      placeholder={placeholder}
      onBlur={onBlur}
    />
  </div>
)

export default Input