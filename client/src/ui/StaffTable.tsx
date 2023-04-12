import React from "react";
import Spinner from "src/icons/Loading";
import { StaffType } from "src/types/StaffType";

interface StaffTableProps {
  staffs: StaffType[];
  loading?: boolean;
  error?: boolean;
}

export const StaffTable: React.FC<StaffTableProps> = ({ staffs, loading }) => {
  const noRecords = staffs.length === 0;

  return (
    <div className="w-full overflow-x-scroll rounded-md shadow remove-scroll">
      <table className="w-full border border-collapse border-black table-auto">
        <thead className="text-gray-700 bg-blue-50 rounded-t-md">
          <tr>
            <th className="w-1/6 px-6 py-3 border">Username</th>
            <th className="w-1/6 px-6 py-3 border">First name</th>
            <th className="w-1/6 px-6 py-3 border">Last name</th>
            <th className="w-1/6 px-6 py-3 border">Mobile</th>
            <th className="w-1/6 px-6 py-3 border">Address</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="h-64 bg-white border">
                <Spinner size={32} className="mx-auto" />
              </td>
            </tr>
          ) : noRecords ? (
            <tr>
              <td colSpan={6} className="h-64 text-center bg-white border">
                <h4>No staffs found.</h4>
              </td>
            </tr>
          ) : (
            staffs.map((staff, idx) => (
              <tr key={staff.username || idx} className="bg-white">
                <td className="w-1/6 px-6 py-3 border">{staff.username}</td>
                <td className="w-1/6 px-6 py-3 border">{staff.firstName}</td>
                <td className="w-1/6 px-6 py-3 border">{staff.lastName}</td>
                <td className="w-1/6 px-6 py-3 border">{staff.mobile}</td>
                <td className="w-2/6 px-6 py-3 border">{staff.address}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
