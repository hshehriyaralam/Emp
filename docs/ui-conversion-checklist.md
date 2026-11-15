# Burgundy Clean List conversion inventory and checklist

This checklist is the working inventory for converting the existing Employee Hub UI to the supplied Burgundy Clean List specification. Routes and menu destinations are based on the App Router tree and current navigation components. The pass is UI-only; behavior and data must remain unchanged.

## Baseline (before the Burgundy conversion)

- Branch: `feat/burgundy-clean-list`, created from the existing `feat/clean-list-ui` worktree; prior changes were preserved.
- `npm.cmd run lint`: failed with 101 errors and 26 warnings, including `no-explicit-any` and hook-rule findings.
- `npx.cmd tsc --noEmit`: passed.
- `npm.cmd run build`: passed; Next.js 16.2.9 generated all 12 app routes listed below.
- First Load JS per route: the baseline build output in this Next.js/Turbopack setup listed routes and rendering mode but did not emit per-route First Load JS byte counts. No reliable per-route size baseline is available from the standard build report.

## Routes and menu destinations

| # | Route/component | Role | File | Old UI found | Status (todo/done) |
|---|---|---|---|---|---|
| 1 | `/` home/redirect | Public | `app/page.tsx` | Route preserved | done |
| 2 | `/_not-found` | Public | `app/not-found.tsx` | Added themed not-found page | done |
| 3 | `/admin-login` | Admin | `app/(admin)/(auth)/admin-login/page.tsx` | Light auth form; browser checked at desktop and mobile widths | done |
| 4 | `/admin-register` | Admin | `app/(admin)/(auth)/admin-register/page.tsx` | Light auth form | done |
| 5 | `/admin-verfication` | Admin | `app/(admin)/(auth)/admin-verfication/page.tsx` | Light OTP form | done |
| 6 | `/login` | Employee | `app/(employee)/(auth)/login/page.tsx` | Light auth form | done |
| 7 | `/register` | Employee | `app/(employee)/(auth)/register/page.tsx` | Light auth form | done |
| 8 | `/admin-dashboard` (Employees menu) | Admin | `app/(admin)/(protected)/admin-dashboard/page.tsx` | Shared responsive shell, toolbar, stats, list/grid and states | done |
| 9 | `/admin-employees/[id]` employee details | Admin | `app/(admin)/(protected)/admin-employees/[id]/page.tsx` | Shared shell, themed details, error and loading states | done |
| 10 | `/admin-notification` (Requests menu) | Admin | `app/(admin)/(protected)/admin-notification/page.tsx` | Shared shell, request filters, cards and actions | done |
| 11 | `/employee-dashboard` (My Dashboard menu) | Employee | `app/(employee)/(dashboard)/employee-dashboard/page.tsx` | Shared shell, profile/request content and mobile empty state | done |

## Shared shell, overlays, and visual components

| # | Route/component | Role | File | Old UI found | Status (todo/done) |
|---|---|---|---|---|---|
| 12 | Admin protected route/layout and guards | Admin | `app/(admin)/(protected)/layout.tsx`, `components/layout/Protectedroute.tsx` | Guard behavior preserved | done |
| 13 | Admin auth layouts | Admin | `app/(admin)/(auth)/layout.tsx`, `app/(admin)/layout.tsx` | Existing auth layout preserved | done |
| 14 | Employee auth/dashboard layouts | Employee | `app/(employee)/(auth)/layout.tsx`, `app/(employee)/(dashboard)/layout.tsx`, `app/(employee)/layout.tsx` | Existing layout behavior preserved | done |
| 15 | Root layout and global theme tokens | Shared | `app/layout.tsx`, `app/globals.css` | Burgundy tokens, responsive shell/overlay states, reduced motion | done |
| 16 | Admin dashboard shell, toolbar and employee loading/empty/error UI | Admin | `components/adminDashboard/employee.tsx`, `filter.tsx`, `errorInterface.tsx` | Burgundy surfaces and responsive states | done |
| 17 | Admin employee stats, cards, and table | Admin | `components/adminDashboard/stats.tsx`, `employeeCard.tsx`, `employeTable.tsx` | Burgundy cards, table/grid and department indicators | done |
| 18 | Add employee modal and image upload | Admin | `components/adminDashboard/addEmployee.tsx` | Accessible 640px modal with image selection and drop support | done |
| 19 | Edit employee modal | Admin | `components/adminDashboard/updateModal.tsx` | Accessible 640px modal with scrollable content/footer | done |
| 20 | Delete confirmation modal | Admin | `components/adminDashboard/delelteModal.tsx` | Themed 420px confirmation with focus and pending behavior | done |
| 21 | Employee request create modal and image/resume uploads | Employee | `components/employeeDashboard/createEmployeeReq.tsx` | Accessible modal with click/drop uploads and mobile layout | done |
| 22 | Employee dashboard request/profile/details/doc preview | Employee | `components/employeeDashboard/requestCard.tsx` | Burgundy profile/status/details and document panel | done |
| 23 | Request filters/cards/actions/document preview | Admin | `components/notifications/notfiycards.tsx`, `cardContent.tsx` | Burgundy request cards, statuses and actions | done |
| 24 | Profile drawer and read-only details/logout | Shared | `components/adminProfile/profileSidebar.tsx`, `userDetails.tsx` | Responsive drawer, focus management and fixed actions | done |
| 25 | Shared header/nav and notification count | Shared | `components/common/appShell.tsx` | Responsive role-based sidebar and mobile navigation | done |
| 26 | Auth forms | Admin/Employee | `components/adminAuth/loginFrom.tsx`, `registerForm.tsx`, `signUpForm.tsx` | Shared Burgundy form styling and behavior | done |
| 27 | OTP verification form | Admin | `components/adminAuth/otpVerification.tsx` | Burgundy OTP form and card | done |
| 28 | Admin employee detail loading/card/error states | Admin | `components/adminEmployees/loadingEmloyee.tsx`, `employeCard.tsx`, `errorHandler.tsx` | Static warm skeleton and themed detail/error states | done |
| 29 | Shared loading and route skeletons | Shared | `components/common/loader.tsx`; every route `loading.tsx` | Themed loading indicator and route states | done |
| 30 | Button primitive | Shared | `components/ui/button.tsx` | Pill variants, pressed/focus styles and pointer cursor | done |
| 31 | Input and OTP primitives | Shared | `components/ui/input-otp.tsx` (and auth inputs) | Warm surfaces and accent focus states | done |
| 32 | Select primitive | Shared | `components/ui/select.tsx` | Themed menu surface, sizing and focus | done |
| 33 | Dropdown menu primitive | Shared | `components/ui/dropdown-menu.tsx` | Themed menu surface and focus | done |
| 34 | Avatar primitive | Shared | `components/ui/avatar.tsx`, `lib/avatars.ts` | Themed fallback styling | done |
| 35 | Toast/sonner | Shared | `components/ui/sonner.tsx` | Burgundy token styling, flat surface, top-center position | done |
| 36 | Spinner primitive | Shared | `components/ui/spinner.tsx` | Themed palette and reduced-motion behavior | done |
| 37 | Date formatting/document download utilities | Shared | `components/common/formatDate.ts`, `hooks/fileDownload.tsx` | Existing behavior preserved | done |
| 38 | Store/socket providers | Shared | `components/layout/reduxProvider.tsx`, `socket/socketProvider.tsx` | Existing provider behavior preserved | done |
| 39 | Brand, status, department, and initials color tokens | Shared | `app/globals.css`, `lib/departmentStyles.ts` | Burgundy/semantic tokens and eight avatar palettes | done |

## Initial old-UI search findings (before Burgundy conversion)

Search scope: `app/`, `components/`, and `lib/`; patterns included dark/near-black classes, cold gray/slate utilities, hex/RGB values, named semantic color utilities, gradients, glow/shadow declarations, `backdrop-blur`, and theme-provider references.

- `app/globals.css`: existing mint/teal brand tokens, cold green-gray neutrals, cold-blue info tokens, hard-coded overlay/shadow colors, and hard-coded shell/status colors.
- `components/notifications/cardContent.tsx`: hard-coded yellow/green/red status utilities and a teal-tinted shadow.
- `components/notifications/notfiycards.tsx`, `app/not-found.tsx`, `app/(employee)/(dashboard)/employee-dashboard/page.tsx`, and multiple auth/modal/profile components: literal white text/background utilities and hard-coded shadows/overlay colors.
- `components/adminDashboard/{addEmployee,updateModal}.tsx` and `components/employeeDashboard/createEmployeeReq.tsx`: hard-coded teal RGBA focus rings and dark photo-overlay colors.
- `components/ui/dropdown-menu.tsx`: hard-coded neutral menu colors.
- `package.json` and `package-lock.json`: `next-themes` remains as an unused dependency; no runtime `ThemeProvider` or `useTheme` use was found.
- No `dark:` utility, `backdrop-blur`, `bg-gradient`, or `linear-gradient` usage was found in the app/component source at this baseline.

## Final validation

- `npx.cmd tsc --noEmit`: passed.
- `npm.cmd run build -- --webpack`: passed in an isolated source copy so the existing development server and its `.next` directory were not disturbed; all 12 routes generated.
- Browser checked `/admin-login`, `/admin-dashboard`, `/admin-notification`, and `/employee-dashboard`; tested responsive widths 360, 768, 1024, and 1280px with no horizontal overflow.
- Browser verified the add-employee and create-request dialogs at 360px: both fit the viewport, focus their first field, and preserve the existing keyboard-close behavior. Employee list/grid switching and the sort selector were also exercised.
- Auth form browser validation was limited to `/admin-login`.
- API requests returned 401/404 responses during browser checks, so authenticated server data and submission/mutation flows could not be validated end-to-end.
- `next-themes` was removed after confirming there are no runtime theme-provider references.
- `npm.cmd run lint` still fails with 95 errors and 24 warnings (baseline: 101 errors and 26 warnings), including repository-wide `any` and hook-rule findings.
- The standard Next.js build output does not report per-route First Load JS sizes, so no comparable bundle-size measurement is available.

All 39 inventory rows are marked `done`; runtime/backend and lint limitations are recorded above.
