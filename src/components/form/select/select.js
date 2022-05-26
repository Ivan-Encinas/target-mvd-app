import { string, func } from 'prop-types';
import cn from 'classnames';

import './styles.css';

const Select = ({ register, options, name, error, placeholder, ...rest }) => (
  <div className="select">
    <select {...register(name)} {...rest} className={cn({ error })}>
      <option value="" disabled selected className="placeholder">
        {placeholder}
      </option>
      {options.map((value, i) => (
        <option key={i} value={value}>
          {value}
        </option>
      ))}
    </select>
    <small className="error-message">{error?.message}</small>
  </div>
);

Select.propTypes = {
  register: func.isRequired,
  name: string,
  type: string,
};

export default Select;
