import React from "react";
import { VariableSizeList } from 'react-window';
import renderRow from './location-card';
import location_data from '../data/locations.json'
let location = location_data;

function getRowHeight(index) {
  // TODO: comment or explain this

  //eslint-disable-next-line
    return (location[index].Address && location[index].Address.length * 1.2 || 0) + (location[index].Name && location[index].Name.length * 1.2 || 0)
}

export default function VirtualizedList() {
    return (
      <div>
        <VariableSizeList height={450} width={300} itemSize={getRowHeight} itemCount={location.length}>
          {renderRow}
        </VariableSizeList>
      </div>
    );
  }
