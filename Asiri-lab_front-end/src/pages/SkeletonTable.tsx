import React from 'react';
import '../css/SkeletonTable.css';

const SkeletonTable: React.FC = () => {
  return (
    <div className="custom-container"> {/* Updated container class name */}
    <table className="custom-tg"> {/* Updated table class name */}
      <tbody>
        {[...Array(5)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(7)].map((_, colIndex) => (
              <td key={colIndex}>
                <div className="custom-line"></div> {/* Updated line class name */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default SkeletonTable;
