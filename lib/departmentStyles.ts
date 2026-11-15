const departmentTokens: Record<string, string> = {
  Engineering: "--department-engineering",
  Marketing: "--department-marketing",
  HR: "--department-hr",
  Finance: "--department-finance",
  Operations: "--department-operations",
  Design: "--department-design",
};

const departmentColorTokens = Object.values(departmentTokens);

export const departmentColor = (department?: string | null) => {
  if (!department) return "var(--department-engineering)";
  const knownToken = departmentTokens[department];
  if (knownToken) return `var(${knownToken})`;

  const hash = Array.from(department).reduce(
    (value, character) => (value * 31 + character.charCodeAt(0)) >>> 0,
    0,
  );
  return `var(${departmentColorTokens[hash % departmentColorTokens.length]})`;
};

const avatarTokens = [
  ["--avatar-bg-1", "--avatar-text-1"],
  ["--avatar-bg-2", "--avatar-text-2"],
  ["--avatar-bg-3", "--avatar-text-3"],
  ["--avatar-bg-4", "--avatar-text-4"],
  ["--avatar-bg-5", "--avatar-text-5"],
  ["--avatar-bg-6", "--avatar-text-6"],
  ["--avatar-bg-7", "--avatar-text-7"],
  ["--avatar-bg-8", "--avatar-text-8"],
];

export const avatarPalette = (name?: string | null) => {
  const stableName = name || "Employee";
  const hash = Array.from(stableName).reduce(
    (value, character) => (value * 31 + character.charCodeAt(0)) >>> 0,
    0,
  );
  const [background, foreground] = avatarTokens[hash % avatarTokens.length];
  return {
    backgroundColor: `var(${background})`,
    color: `var(${foreground})`,
  };
};
