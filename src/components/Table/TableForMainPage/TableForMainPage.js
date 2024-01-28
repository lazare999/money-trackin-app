import React from 'react';

// import cashOut from '/images/expensIcons/cash-out.png';
// import otherIcon from '/images/expensIcons/other.png';
// import partyIcon from '/images/expensIcons/party.png';
// import shoppingIcon from '/images/expensIcons/shopping.png';
// import taxIcon from '/images/expensIcons/taxes.png';

import classes from './TableForMainPage.module.css';

const TableForMainPage = ({ expendedMoney, handleCategoryClick }) => {
  const icons = {
    cashOut: '/images/expensIcons/cash-out.svg',
    otherIcon: '/images/expensIcons/other.svg',
    partyIcon: '/images/expensIcons/party.svg',
    shoppingIcon: '/images/expensIcons/shopping.svg',
    taxIcon: '/images/expensIcons/taxes.svg',
  };

  const categoryIcons = {
    cash_out: icons.cashOut,
    other: icons.otherIcon,
    fun: icons.partyIcon,
    shoping: icons.shoppingIcon,
    tax: icons.taxIcon,
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
              <td className={classes.td} title='Click for ditails'>
                {categoryIcons[category] ? (
                  <img src={process.env.PUBLIC_URL + categoryIcons[category]} alt={`${category} icon`} className={classes.icons} />
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
