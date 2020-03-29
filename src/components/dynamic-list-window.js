import React from "react";
import { VariableSizeList } from 'react-window';
import renderRow from './location-card';
import locations from '../hooks/airtable';

function getRowHeight(index) {
  console.log('index is:', index)
  const { Name, Address } = locations.getById(index)
  console.log('name:', Name, 'Address:', Address)
  console.log('height:', ((Address.length * 1.2) + (Name.length * 1.2)))
  return ((Address.length * 1.2) + (Name.length * 1.2))
}

export default function VirtualizedList() {  
    return (
      <div>
        <VariableSizeList height={450} width={300} itemSize={getRowHeight} itemCount={locations.length}>
          {renderRow}
        </VariableSizeList>
      </div>
    );
  }
  