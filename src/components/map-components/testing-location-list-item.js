import 'leaflet.locatecontrol';
import Box from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import React from 'react';

export default function TestingLocationListItem({ index, title, description, city_state, service_time, driveThru, phone }) {

  return (
    <div className="card-map-location">
      <Box className="container-location">
        <div className="card-content">
          <h3 className="card-title" style={{ color: '#000' }}>
            <span className="grey" style={{}}>
              {index + 1}.
            </span>{' '}
            {title}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'row', fontSize: '13px' }} className="grey">
            <p style={{ color: '#151522'  }}>{city_state}</p>
            <p style={{ padding: '0 30px' }}>{service_time}</p>
            <p style={{ padding: '0 30px' }}>{ driveThru.toString() === 'true' ? 'Drive Through' : '' }</p>
          </div>
          <p className="card-description" style={{ color: '#151522' }}>
            {description}
          </p>
          <div className="buttons" style={{ marginTop: '15px' }}>

            <a
              href={'https://www.google.com/maps/dir/?api=1&destination=' + description}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button className="btn primary-color primary-outline">Directions</Button>
            </a>

            <a
              href={'tel:' + phone }
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button
                className="btn primary-color primary-outline" style={{ marginLeft: '15px' }}>
                Call
              </Button>
            </a>
          </div>
        </div>
      </Box>
    </div>
  );
}
;
