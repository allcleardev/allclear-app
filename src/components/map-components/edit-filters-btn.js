import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SettingsSVG from '@svg/svg-settings';
import Badge from '@material-ui/core/Badge';

export default function EditFiltersBtn(props) {
  const { numActiveFilters, onClick } = props;
  const badgeRef = React.createRef();
  const showFilterCountBadge = numActiveFilters > 0;

  return showFilterCountBadge ? (
    <Badge
      ref={badgeRef}
      badgeContent={numActiveFilters}
      overlap={'rectangle'}
    >
      <EditFiltersButton onClick={onClick} />
    </Badge>
  ) : (<EditFiltersButton onClick={onClick} />);
}

function EditFiltersButton(props) {
  return (
    <IconButton
      aria-label="edit filters"
      aria-haspopup="true"
      className="edit-filters-icon-button"
      size="small"
      onClick={props.onClick}
    >
      {SettingsSVG({ color: '#666666' })}
    </IconButton>
  );
}