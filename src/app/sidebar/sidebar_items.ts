import { Roles } from "../Models/roles";

export const items = [
    {
        path: "/dashboard",
        title: "Dashboard",
        icon: "menu-icon mdi mdi-television",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/admins",
        title: "Administrateurs",
        icon: "menu-icon fa fa-user-o",
        roles: Roles.SuperAdmin,
        queryParams: ""
    },
    {
        path: "/forms",
        title: "Form elements",
        icon: "menu-icon mdi mdi-notification-clear-all",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/buttons",
        title: "Buttons",
        icon: "menu-icon mdi mdi-dna",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/progressbar",
        title: "Progress bar",
        icon: "menu-icon mdi mdi-trackpad",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/carousel",
        title: "Carousel",
        icon: "menu-icon mdi mdi-texture",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/tooltips",
        title: "Tooltip",
        icon: "menu-icon mdi mdi-content-copy",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/tabs",
        title: "Tabs",
        icon: "menu-icon mdi mdi-lightbulb-outline",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/dropdowns",
        title: "Dropdown",
        icon: "menu-icon mdi mdi-backup-restore",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/sheet",
        title: "Sheet PFE",
        icon: "menu-icon fa fa-file-text-o",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/sheet",
        title: "Accepted",
        icon: "menu-icon fa fa-file-text-o",
        roles: "All",
        queryParams: { q: '_accepted' }
    },
    {
        path: "/sheet",
        title: "Encadreur assignment",
        icon: "menu-icon fa fa-file-text-o",
        roles: "All",
        queryParams: { q: '_encadreur' }
    },
    {
        path: "/sheet",
        title: "Rapporteur assignment",
        icon: "menu-icon fa fa-file-text-o",
        roles: "All",
        queryParams: { q: '_rapporteur' }
    },
    {
        path: "/sheet",
        title: "Note",
        icon: "menu-icon fa fa-file-text-o",
        roles: "All",
        queryParams: { q: '_note' }
    },
    {
        path: "/sheet",
        title: "Defense planning",
        icon: "menu-icon fa fa-file-text-o",
        roles: "All",
        queryParams: { q: '_planning' }
    },
  {
    path: "/soutenanceNonNote",
    title: "soutenance",
    icon: "menu-icon fa fa-file-text-o",
    roles: "All"
  },
    {
        path: "/internship",
        title: "Internship agreement",
        icon: "menu-icon fa fa-address-card-o",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/breadcrumbs",
        title: "Breadcrumb",
        icon: "menu-icon mdi mdi-flag-outline",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/pagination",
        title: "Pagination",
        icon: "menu-icon mdi mdi-loupe",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/tables",
        title: "Tables",
        icon: "menu-icon mdi mdi-table",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/alerts",
        title: "Alerts",
        icon: "menu-icon mdi mdi-shield-outline",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/accordions",
        title: "Accordion",
        icon: "menu-icon mdi mdi-altimeter",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/badges",
        title: "Badges",
        icon: "menu-icon mdi mdi-checkbox-multiple-blank-circle-outline",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/icons",
        title: "Icons",
        icon: "menu-icon mdi mdi-chart-bubble",
        roles: "All",
        queryParams: ""
    },
    {
        path: "/forum",
        title: "Forum",
        icon: "menu-icon fa fa-address-card-o",
        roles: [Roles.Etudiant]
    },
    {
        path: "/typography",
        title: "Typography",
        icon: "menu-icon mdi mdi-format-italic",
        roles: "All",
        queryParams: ""
    },
]
