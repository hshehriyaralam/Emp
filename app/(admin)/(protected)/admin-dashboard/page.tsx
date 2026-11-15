"use client";
import { useMemo, useState } from "react";
import {
  useAddEmployeeMutation,
  useGetAllEmployeesQuery,
} from "@/store/employeeApi";
import {
  useAdminProfileQuery,
  useLogOutAdminMutation,
  useUpdateProfileImgMutation,
} from "@/store/admin";
import dynamic from "next/dynamic";
import AppShell from "@/components/common/appShell";

const ErrorInterface = dynamic(
  () => import("@/components/adminDashboard/errorInterface"),
);
const Stats = dynamic(() => import("@/components/adminDashboard/stats"));
const Filter = dynamic(() => import("@/components/adminDashboard/filter"));
const Employee = dynamic(() => import("@/components/adminDashboard/employee"));
const AddEmployeeModal = dynamic(
  () => import("@/components/adminDashboard/addEmployee"),
);

const Dashboard = () => {
  const [addEmployee, { isLoading: Adding }] = useAddEmployeeMutation();
  const { data: Profile } = useAdminProfileQuery(undefined);
  const [updateProfileImg] = useUpdateProfileImgMutation();
  const [logOutUser] = useLogOutAdminMutation();
  const { data, isLoading, error } = useGetAllEmployeesQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredEmployees = useMemo(() => {
    if (!data) return [];
    let employees = [...data].filter(
      (emp: any) =>
        emp?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp?.department?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    switch (sortOrder) {
      case "salary-asc":
        employees.sort((a: any, b: any) => a.salary - b.salary);
        break;
      case "salary-desc":
        employees.sort((a: any, b: any) => b.salary - a.salary);
        break;
      case "name-asc":
        employees.sort((a: any, b: any) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        employees.sort((a: any, b: any) => b.name.localeCompare(a.name));
        break;
      case "department":
        employees.sort((a: any, b: any) =>
          a.department.localeCompare(b.department),
        );
        break;
      default:
        break;
    }

    return employees;
  }, [data, searchTerm, sortOrder]);

  const stats = useMemo(() => {
    if (!data) return null;
    const total = data.length;
    const departments = new Set(data.map((emp: any) => emp.department)).size;
    const totalSalary = data.reduce(
      (acc: number, emp: any) => acc + parseFloat(emp.salary),
      0,
    );

    const avgSalary = total > 0 ? Math.round(totalSalary / total) : 0;
    const maxSalary =
      total > 0
        ? Math.max(...data.map((emp: any) => parseFloat(emp.salary)))
        : 0;

    return { total, departments, avgSalary, maxSalary, totalSalary };
  }, [data]);

  if (error) {
    return (
      <AppShell
        Profile={Profile}
        logOutUser={logOutUser}
        navigate="/admin-login"
        updateProfileImg={updateProfileImg}
        isAdmin
      >
        <ErrorInterface />
      </AppShell>
    );
  }

  return (
    <AppShell
      Profile={Profile}
      logOutUser={logOutUser}
      navigate="/admin-login"
      updateProfileImg={updateProfileImg}
      isAdmin
    >
        <div className="page-header">
          <div>
            <h1 className="page-title">Employees</h1>
            <p className="page-subtitle">Manage your workforce</p>
          </div>

          <Filter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setIsModalOpen={setIsModalOpen}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            viewMode={viewMode}
            setViewMode={setViewMode}
            totalResults={filteredEmployees.length}
          />
        </div>

        {stats && <Stats stats={stats} />}

        <Employee
          filteredEmployees={filteredEmployees}
          isLoading={isLoading}
          error={error}
          viewMode={viewMode}
          setIsModalOpen={setIsModalOpen}
        />

      {isModalOpen && (
        <AddEmployeeModal
          setIsModalOpen={setIsModalOpen}
          addEmployee={addEmployee}
          isLoading={Adding}
          data={Profile}
        />
      )}
    </AppShell>
  );
};

export default Dashboard;