import { Plus, Search, LayoutGrid, List, X, ArrowUpDown } from "lucide-react";
import { FilterProps } from "@/types/employee";

const Filter = ({
  searchTerm,
  setSearchTerm,
  setIsModalOpen,
  viewMode,
  setViewMode,
  sortOrder,
  setSortOrder,
}: FilterProps) => {
  return (
    <div className="page-actions">
      <div className="search-shell">
        <Search size={15} className="search-icon" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          aria-label="Search employees"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            aria-label="Clear search"
            style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", background: "transparent", border: "none", cursor: "pointer" }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      <label className="sort-shell">
        <ArrowUpDown size={15} className="sort-icon" aria-hidden="true" />
        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          className="sort-select"
          aria-label="Sort employees"
        >
          <option value="default">Sort by</option>
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
          <option value="salary-asc">Salary: Low to High</option>
          <option value="salary-desc">Salary: High to Low</option>
          <option value="department">Department</option>
        </select>
      </label>

      <div className="view-toggle" aria-label="Choose employee view mode">
        <button
          type="button"
          className={viewMode === "grid" ? "active" : ""}
          onClick={() => setViewMode("grid")}
          aria-label="Grid view"
          title="Grid View"
        >
          <LayoutGrid size={15} />
        </button>
        <button
          type="button"
          className={viewMode === "list" ? "active" : ""}
          onClick={() => setViewMode("list")}
          aria-label="List view"
          title="List View"
        >
          <List size={15} />
        </button>
      </div>

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="primary-button"
      >
        <Plus size={15} />
        <span>Add Employee</span>
      </button>
    </div>
  );
};

export default Filter;