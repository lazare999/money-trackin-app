import React from 'react';

import cashOut from '../../../images/expensIcons/cash-out.png';
import otherIcon from '../../../images/expensIcons/other.png';
import partyIcon from '../../../images/expensIcons/party.png';
import shoppingIcon from '../../../images/expensIcons/shopping.png';
import taxIcon from '../../../images/expensIcons/taxes.png';

import classes from './TableForMainPage.module.css';

const TableForMainPage = ({ expendedMoney, handleCategoryClick }) => {
  const categoryIcons = {
    cash_out: cashOut,
    other: otherIcon,
    fun: partyIcon,
    shoping: shoppingIcon,
    tax: taxIcon,
  };

  return (
    <div className={classes.container}>
      <table className={classes.contentTable}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(expendedMoney).map((category) => (
            <tr key={category} onClick={() => handleCategoryClick(category)}>
              <td className={classes.td}>
                {categoryIcons[category] ? (
                  <img src={categoryIcons[category]} alt={`${category} icon`} className={classes.icons} />
                ) : null}
                {category}
              </td>
              <td>{expendedMoney[category].toFixed(2)}$</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableForMainPage;
