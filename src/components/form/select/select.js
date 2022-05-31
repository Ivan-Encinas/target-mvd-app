import { string, func } from 'prop-types';
import cn from 'classnames';
import { v4 as uuid } from 'uuid';

import './styles.scss';

const Select = ({ register, options, name, error, placeholder, ...rest }) => (
  <div className="select">
    <select {...register(name)} {...rest} className={cn({ error })}>
      <option value="" disabled selected className="placeholder">
        {placeholder}
      </option>
      {options.map(value => (
        <option key={uuid()} value={value}>
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
