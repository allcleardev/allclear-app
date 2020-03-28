import React from "react";
import { VariableSizeList } from 'react-window';
import renderRow from './location-card';
import locationdata from "../pages/location_data.json";

let loc = locationdata

function getRowHeight(index) {
    return (loc[index].Address && loc[index].Address.length * 1.2 || 0) + (loc[index].Name && loc[index].Name.length * 1.2 || 0)
}

export default function VirtualizedList() {  
    return (
      <div>
        <VariableSizeList height={450} width={300} itemSize={getRowHeight} itemCount={loc.length}>
          {renderRow}
        </VariableSizeList>
      </div>
    );
  }
  