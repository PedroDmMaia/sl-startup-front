import EmployeeTable from '@/components/employee-table'
import React from 'react'

export default function EmployeePage() {
  return (
    <div className="w-full">
      <header className="mb-20">
        <h2 className="text-xl">Employee</h2>
      </header>
      <EmployeeTable page={1} />
    </div>
  )
}
