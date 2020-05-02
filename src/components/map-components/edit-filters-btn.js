import React from 'react';
import Button from '@material-ui/core/Button';
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
      style={{ width: '100%' }}
    >
      <EditFiltersButton onClick={onClick} />
    </Badge>
  ) : (<EditFiltersButton onClick={onClick} />);
}

function EditFiltersButton(props) {
  return (
    <Button
      className={'edit-filters-btn'}
      variant="contained"
      color="primary"
      fullWidth
      startIcon={SettingsSVG()}
      onClick={props.onClick}
    >
      Edit Search Filters
    </Button>
  );
}