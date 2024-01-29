import React, { useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Loans } from '../api/collections/loans';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();
  const { allLoans } = useTracker(() => {
    const handle = Meteor.subscribe('allLoans');
    if (!handle.ready()) return { allLoans: [] };
    const allLoans = Loans.find().fetch();
    console.log(allLoans);
    return { allLoans: allLoans };
  });

  console.log(allLoans);

  return (
    <div className='w-full p-1'>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-white border dark:bg-gray-800 dark:border-gray-700">
          <thead className="text-xs text-gray-700 uppercase bg-green-500 dark:bg-green-700 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Borrower info
              </th>
              <th scope="col" className="px-6 py-3">
                Loan amount
              </th>
              <th scope="col" className="px-6 py-3">
                Requested on
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Approved by
              </th>
              <th scope="col" className="px-6 py-3">
                Approved time
              </th>
            </tr>
          </thead>
          <tbody>
            {allLoans.map((loan) => (
              <tr className="hover:bg-green-100 dark:hover:bg-green-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {loan.borrowerInfo.email}
                </th>
                <td className="px-6 py-4">
                  {loan.borrowerInfo.loanAmount}
                </td>
                <td className="px-6 py-4">
                  {new Date(loan.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {loan.status}
                </td>
                <td className="px-6 py-4">
                  {loan.approvedBy ? loan.approvedBy : 'N/A' }
                </td>
                <td className="px-6 py-4">
                  { loan.approvedTime ? new Date(loan.approvedTime).toLocaleString(): 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
